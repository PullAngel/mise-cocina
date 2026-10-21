import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, CSSProperties, DragEvent, PointerEvent as ReactPointerEvent } from "react";
import { parseRecipeInput, readRecipeFile } from "./lib/importRecipe";
import { scaledQuantity } from "./lib/ingredients";
import { clearActiveSession, loadActiveSession, loadRecentRecipes, rememberRecipe, saveActiveSession } from "./lib/storage";
import { addTime, createTimer, formatDuration, isRunning, pauseTimer, remainingMs, startTimer } from "./lib/timer";
import { enterKitchenDisplay, leaveKitchenDisplay } from "./platform/display";
import { getDeviceStatus, type DeviceStatus } from "./platform/deviceStatus";
import { selectionHaptic } from "./platform/haptics";
import {
  cancelTimerNotification,
  configureNotificationChannel,
  listenForTimerNotificationActions,
  notificationReadiness,
  openExactAlarmSettings,
  requestNotificationPermission,
  scheduleTimerNotification,
  type NotificationReadiness
} from "./platform/notifications";
import { listenForSpeechEnd, speak, stopSpeaking } from "./platform/speech";
import { listenForNativeRecipes } from "./platform/nativeImport";
import { exportTextFile } from "./platform/fileExport";
import { currentOrientation, setOrientationLocked } from "./platform/orientation";
import { configureSilentAlarmChannel, requestSilentAlarmAccess } from "./platform/silentAlerts";
import type { ActiveSession, Component, ComponentRole, Ingredient, IngredientKind, MiseRecipe, RecentRecipe, RecipeStep, SessionClockState, TimerState } from "./types";
import { preloadedRecipes } from "./data/preloadedRecipes";
import { buildAdapterPrompt, buildChefPrompt, miseSchema, profileInfo, recommendProfile, type ChefAnswers, type ChefProfile } from "./lib/handoffKit";

type View = "import" | "review" | "cook";
type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed" }> };

function stepNotificationId(index: number): number {
  return 12000 + index;
}

async function copyText(content: string): Promise<void> {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(content);
  const field = document.createElement("textarea");
  field.value = content;
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.select();
  document.execCommand("copy");
  field.remove();
}

function makeSession(recipe: MiseRecipe, servings = recipe.servings.count, missingIngredientIds: string[] = []): ActiveSession {
  const timers = Object.fromEntries(
    recipe.steps.filter(step => step.timer).map((step, index) => [
      step.id,
      createTimer(step.id, step.timer!.durationSeconds, stepNotificationId(index))
    ])
  );
  return {
    recipe,
    selectedStepId: recipe.steps[0].id,
    servings,
    timers,
    completedStepIds: [],
    missingIngredientIds,
    orientationLocked: false,
    sessionClock: { accumulatedMs: 0 },
    startedAt: Date.now(),
    updatedAt: Date.now()
  };
}

function timerProgress(timer: TimerState | undefined, now: number): { percent: number; phase: string } {
  if (!timer || timer.durationMs <= 0) return { percent: 0, phase: "calm" };
  const percent = Math.min(100, Math.max(0, Math.round((1 - remainingMs(timer, now) / timer.durationMs) * 100)));
  const phase = percent >= 100 ? "finished" : percent >= 90 ? "critical" : percent >= 70 ? "alert" : percent >= 35 ? "active" : "calm";
  return { percent, phase };
}

function sessionElapsed(session: ActiveSession, now: number): number {
  const clock = session.sessionClock ?? { accumulatedMs: 0 };
  return clock.accumulatedMs + (clock.runningSince ? Math.max(0, now - clock.runningSince) : 0);
}

function stepSummary(step: RecipeStep): string {
  if (step.shortLabel) return step.shortLabel;
  return step.action.replace(/[.!?]+$/, "");
}

function ImportView({ onRecipe, recent }: { onRecipe: (recipe: MiseRecipe, warnings: string[]) => void; recent: RecentRecipe[] }) {
  const [text, setText] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [pasteOpen, setPasteOpen] = useState(false);
  const [kitMode, setKitMode] = useState<"new" | "existing">("new");
  const [answers, setAnswers] = useState<ChefAnswers>({ experience: "intermedio", priority: "practical", initiative: "proponé y decidimos" });
  const [profile, setProfile] = useState<ChefProfile>("practical");
  const [notice, setNotice] = useState<string>();
  const recommended = recommendProfile(answers);
  const prompt = kitMode === "existing" ? buildAdapterPrompt() : buildChefPrompt(profile, answers);

  useEffect(() => { if (kitMode === "new") setProfile(recommended); }, [kitMode, recommended]);

  const accept = useCallback((result: ReturnType<typeof parseRecipeInput>) => {
    if (result.ok) onRecipe(result.recipe, result.warnings);
    else setErrors(result.errors);
  }, [onRecipe]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("share-target") !== "1") return;
    const shared = [params.get("text"), params.get("url")].filter(Boolean).join("\n");
    if (shared) accept(parseRecipeInput(shared));
    history.replaceState({}, "", location.pathname);
  }, [accept]);

  const pickFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) accept(await readRecipeFile(file));
    event.target.value = "";
  };

  const dropFile = async (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) accept(await readRecipeFile(file));
  };

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(undefined), 2600);
  };
  const copyPrompt = async () => {
    try {
      await copyText(prompt.trim());
      showNotice("Prompt copiado. Pegalo una vez en ChatGPT.");
    } catch {
      showNotice("No se pudo copiar. Probá Guardar o compartir.");
    }
  };
  const shareFile = async (filename: string, content: string, mimeType: string, title: string) => {
    try {
      await exportTextFile(filename, content, mimeType, title);
      showNotice("Archivo preparado para guardar o compartir.");
    } catch {
      showNotice("No se pudo abrir el selector de archivos.");
    }
  };

  return <main className="home-shell">
    <header className="home-header"><span className="brand"><i /><b>Mise</b></span><div><h1>¿Qué vas a cocinar?</h1><p>Abrí una receta para empezar. Si todavía no tenés una, prepará tu Chef para Mise.</p></div></header>
    <div className="home-actions">
    <section className="setup-card">
      <div className="card-heading"><p className="eyebrow green">2 · Preparar ChatGPT</p><h2>Tu Chef, compatible con Mise</h2></div>
      <div className="mode-switch"><button className={kitMode === "new" ? "active" : ""} onClick={() => setKitMode("new")}>Crear mi Chef</button><button className={kitMode === "existing" ? "active" : ""} onClick={() => setKitMode("existing")}>Adaptar mi chat</button></div>
      {kitMode === "new" ? <div className="chef-config">
        <div className="chef-questions"><label>Mi experiencia<select value={answers.experience} onChange={event => setAnswers(previous => ({ ...previous, experience: event.target.value }))}><option value="principiante">Estoy aprendiendo</option><option value="intermedio">Me manejo bien</option><option value="avanzado">Tengo experiencia</option></select></label><label>Quiero que priorice<select value={answers.priority} onChange={event => setAnswers(previous => ({ ...previous, priority: event.target.value as ChefProfile }))}><option value="practical">Resolver rápido</option><option value="explorer">Explorar sabores</option><option value="technical">Aprender técnica</option><option value="calm">Cocinar con calma</option></select></label><label>Iniciativa<select value={answers.initiative} onChange={event => setAnswers(previous => ({ ...previous, initiative: event.target.value }))}><option value="proponé y decidimos">Proponé y decidimos</option><option value="guiame">Guiame bastante</option><option value="solo cuando haga falta">Intervení poco</option></select></label></div>
        <p className="recommendation">Recomendado para vos: <b>{profileInfo[recommended].name}</b></p>
        <div className="profile-grid">{(Object.keys(profileInfo) as ChefProfile[]).map(id => <button className={profile === id ? "selected" : ""} onClick={() => setProfile(id)} key={id}><b>{profileInfo[id].name}</b><span>{profileInfo[id].description}</span></button>)}</div>
      </div> : <p className="adapter-copy">Conserva el tono y la memoria de tu chat culinario. Solo agrega el contrato de entrega cuando escribas «pasala a Mise».</p>}
      <div className="kit-summary"><span>Necesitás solamente</span><b>1 prompt + mise-recipe.schema.json</b></div>
      <div className="handoff-actions"><button className="primary" onClick={copyPrompt}>Copiar prompt</button><button className="ghost" onClick={() => shareFile(kitMode === "existing" ? "mise-adaptar-chat.txt" : `mise-chef-${profile}.txt`, prompt, "text/plain", "Guardar prompt Mise")}>Guardar o compartir prompt</button><button className="ghost" onClick={() => shareFile("mise-recipe.schema.json", miseSchema, "application/json", "Guardar esquema Mise")}>Guardar o compartir esquema</button></div>
    </section>
    <section className="load-card">
      <div className="card-heading"><p className="eyebrow">1 · Abrir receta</p><h2>Llevála a la mesada</h2><p>Usá el archivo que te entregó ChatGPT o pegá el bloque Mise.</p></div>
      <label className={`drop-zone ${dragging ? "dragging" : ""}`} onDragOver={event => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={dropFile}>
        <input type="file" accept=".json,.mise.json,application/json" onChange={pickFile} />
        <strong>Abrir archivo .mise.json</strong>
        <span>También podés compartirlo directamente desde Android</span>
      </label>
      {errors.length > 0 && <div className="error-box" role="alert"><strong>Hay que corregir la entrega</strong>{errors.map(error => <span key={error}>{error}</span>)}</div>}
      <button className="paste-button" onClick={() => setPasteOpen(true)}>Pegar bloque Mise</button>
      {recent.length > 0 && <div className="compact-recents"><h3>Recientes en este teléfono</h3>{recent.slice(0, 3).map(item => <button key={item.recipe.recipeId} onClick={() => onRecipe(item.recipe, [])}><b>{item.recipe.title}</b><span>{item.recipe.servings.count}p · {item.recipe.steps.length} pasos</span></button>)}</div>}
    </section>
    </div>
    <section className="preloaded-panel"><div className="preloaded-heading"><div><p className="eyebrow green">Recetas precargadas</p><h2>Cocinar algo ya</h2></div><span>{preloadedRecipes.length} recetas offline</span></div><div className="preloaded-list">{preloadedRecipes.map((item, index) => <button key={item.recipeId} onClick={() => onRecipe(item, [])}><i>{String(index + 1).padStart(2, "0")}</i><b>{item.title}</b><span>{item.servings.count}p · {item.steps.length} pasos</span></button>)}</div></section>
    {pasteOpen && <div className="paste-backdrop" role="presentation"><section className="paste-sheet" role="dialog" aria-modal="true" aria-labelledby="paste-title"><header><div><p className="eyebrow green">Importar texto</p><h2 id="paste-title">Pegá el bloque Mise</h2></div><button className="icon-button" onClick={() => setPasteOpen(false)}>×</button></header><textarea autoFocus value={text} onChange={event => { setText(event.target.value); if (errors.length) setErrors([]); }} placeholder="---MISE/1---&#10;{ ... }&#10;---END-MISE---" spellCheck={false} />{errors.length > 0 && <div className="error-box paste-errors" role="alert"><strong>No pudimos preparar esta receta</strong>{errors.slice(0, 4).map(error => <span key={error}>{error}</span>)}</div>}<footer><button className="ghost" onClick={() => { setPasteOpen(false); setErrors([]); }}>Cancelar</button><button className="primary" disabled={!text.trim()} onClick={() => accept(parseRecipeInput(text))}>Preparar la mesada</button></footer></section></div>}
    {notice && <div className="home-notice" role="status">{notice}</div>}
  </main>;
}

function componentStyle(role: ComponentRole | undefined): CSSProperties {
  const colors: Record<ComponentRole, string> = { main: "#d75b43", sauce: "#a34d68", garnish: "#d19b32", salad: "#4f8d63", drink: "#3f7f99", dessert: "#8c5b88", topping: "#c87838", other: "#607873" };
  return { "--component-color": colors[role ?? "other"] } as CSSProperties;
}

function componentRole(component: Component | undefined): ComponentRole {
  if (!component) return "other";
  if (component.role) return component.role;
  const title = component.title.toLocaleLowerCase("es");
  if (/salsa|laca|glase|aderezo|caramelo/.test(title)) return "sauce";
  if (/ensalada/.test(title)) return "salad";
  if (/jugo|bebida|limonada/.test(title)) return "drink";
  if (/postre|flan|torta|dulce/.test(title)) return "dessert";
  if (/guarnici|arroz|papa|batata|pur[eé]|vegetal|verdura|arepa/.test(title)) return "garnish";
  if (/termina|emplat|cobertura|topping/.test(title)) return "topping";
  if (/pollo|carne|bondiola|cerdo|pescado|lomo|prote[ií]na|pabell[oó]n|humita/.test(title)) return "main";
  return "other";
}

function ingredientComponent(recipe: MiseRecipe, ingredientId: string) {
  const candidates = recipe.steps.filter(candidate => candidate.amounts.some(amount => amount.ingredientId === ingredientId));
  const stepWithIngredient = candidates.find(candidate => !/mise|preparar|mesada/i.test(`${candidate.id} ${candidate.shortLabel ?? ""}`)) ?? candidates[0];
  return recipe.components.find(component => component.id === stepWithIngredient?.componentId);
}

function ReviewView({ recipe, warnings, onBack, onStart }: { recipe: MiseRecipe; warnings: string[]; onBack: () => void; onStart: (servings: number, missingIds: string[]) => void }) {
  const [servings, setServings] = useState(recipe.servings.count);
  const [missingIds, setMissingIds] = useState<string[]>([]);
  const toggleMissing = (id: string) => setMissingIds(previous => previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id]);
  return <main className="prep-page">
    <section className="prep-scroll">
      <header className="prep-hero"><div><p className="eyebrow green">Preparar la mesada · revisión {recipe.revision}</p><h1>{recipe.title}</h1><p>{recipe.context.goal}</p></div><div className="prep-servings"><span>Comensales</span><strong>{servings}</strong><div><button onClick={() => setServings(Math.max(1, servings - 1))}>−</button><button onClick={() => setServings(Math.min(12, servings + 1))}>+</button></div></div></header>
      {warnings.length > 0 && <section className="prep-notices" aria-label="Avisos de la receta">{warnings.map(warning => <article key={warning}><i>!</i><div><b>Revisá este dato</b><span>{warning}</span></div></article>)}</section>}
      <div className="prep-grid">
        <section className="prep-ingredients"><div className="section-heading"><p className="eyebrow green">Principal antes de cocinar</p><h2>Ingredientes</h2><span>Tocá para marcar lo que falta</span></div><div className="prep-ingredient-list">{recipe.ingredients.map(ingredient => { const missing = missingIds.includes(ingredient.id); const component = ingredientComponent(recipe, ingredient.id); const role = componentRole(component); const scaled = scaledQuantity(ingredient, recipe.servings.count, servings, recipe.locale); return <button className={`prep-ingredient ${missing ? "missing" : ""}`} style={componentStyle(role)} onClick={() => toggleMissing(ingredient.id)} key={ingredient.id}><IngredientGlyph ingredient={ingredient} role={role} /><span><b>{ingredient.name}</b><small>{missing ? "Falta" : ingredient.optional ? "Opcional" : "Disponible"}</small></span><em>{scaled.amount}</em></button>; })}</div></section>
        <section className="prep-route"><div className="section-heading"><p className="eyebrow">Mapa de trabajo</p><h2>{recipe.steps.length} pasos</h2><span>{recipe.components.length} partes del plato</span></div><ol>{recipe.steps.map((candidate, index) => { const component = recipe.components.find(item => item.id === candidate.componentId); return <li style={componentStyle(componentRole(component))} key={candidate.id}><i>{String(index + 1).padStart(2, "0")}</i><span><small>{component?.title}</small><b>{stepSummary(candidate)}</b></span></li>; })}</ol><div className="prep-equipment"><b>Equipo</b><span>{recipe.context.equipment.join(" · ") || "Sin equipo especial"}</span></div></section>
      </div>
    </section>
    <footer className="prep-actions"><button className="ghost" onClick={onBack}>Elegir otra</button><div><span>{missingIds.length ? `${missingIds.length} ingredientes faltantes` : "Mesada lista"}</span><button className="primary" onClick={() => onStart(servings, missingIds)}>Entrar a la cocina</button></div></footer>
  </main>;
}

const ingredientMarks: Record<IngredientKind, string> = {
  protein: "◆", vegetable: "●", grain: "▦", liquid: "◒", seasoning: "✦", fat: "◐", dairy: "□", other: "◇"
};

function IngredientGlyph({ ingredient, role }: { ingredient: Ingredient; role?: ComponentRole }) {
  const kind = ingredient.kind ?? "other";
  return <span className={`ingredient-glyph kind-${kind} role-${role ?? "other"}`} style={componentStyle(role)} aria-hidden="true">{ingredientMarks[kind]}</span>;
}

function ingredientStyle(missing = false): CSSProperties {
  const [ink, wash] = missing ? ["#a82f28", "#f6d8d2"] : ["#2f684b", "#dce8d8"];
  return { "--ingredient-ink": ink, "--ingredient-wash": wash } as CSSProperties;
}

function IngredientText({ text, recipe, missingIds }: { text: string; recipe: MiseRecipe; missingIds: string[] }) {
  const ingredients = [...recipe.ingredients].sort((a, b) => b.name.length - a.name.length);
  if (ingredients.length === 0) return <>{text}</>;
  const descriptiveWords = new Set(["grande", "mediano", "mediana", "pequeño", "pequeña", "fresco", "fresca", "rallado", "rallada", "picado", "picada", "neutro", "neutra", "blanco", "blanca", "rojo", "roja", "verde", "churrascos"]);
  const lookup = new Map<string, Ingredient>();
  ingredients.forEach(item => {
    lookup.set(item.name.toLocaleLowerCase(recipe.locale), item);
    item.name.split(/\s+/u).filter(word => word.length >= 3 && !descriptiveWords.has(word.toLocaleLowerCase(recipe.locale))).forEach(word => {
      const key = word.toLocaleLowerCase(recipe.locale);
      if (!lookup.has(key)) lookup.set(key, item);
    });
    const numericPhrase = item.name.match(/\d+\s+[^\s]+/u)?.[0];
    if (numericPhrase) lookup.set(numericPhrase.toLocaleLowerCase(recipe.locale), item);
  });
  const escaped = [...lookup.keys()].sort((a, b) => b.length - a.length).map(name => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const expression = new RegExp(`((?<![\\p{L}\\p{N}])(?:${escaped.join("|")})(?![\\p{L}\\p{N}]))`, "giu");
  return <>{text.split(expression).map((part, index) => {
    const ingredient = lookup.get(part.toLocaleLowerCase(recipe.locale));
    if (!ingredient) return <span key={`${part}-${index}`}>{part}</span>;
    const missing = missingIds.includes(ingredient.id);
    return <mark className={`ingredient-mention ${missing ? "missing" : ""}`} style={ingredientStyle(missing)} key={`${ingredient.id}-${index}`}>{part}</mark>;
  })}</>;
}

function OrientationIcon({ locked }: { locked: boolean }) {
  return <span className="orientation-icon" aria-hidden="true"><svg viewBox="0 0 28 28"><rect x="5" y="3" width="13" height="21" rx="3" /><circle cx="11.5" cy="20.5" r="1" /><path className="lock-body" d="M15 14h9v8h-9z" /><path className="lock-arch" d={locked ? "M17 14v-2a2.5 2.5 0 0 1 5 0v2" : "M17 14v-2a2.5 2.5 0 0 1 4.7-1.2"} /></svg></span>;
}

function amountForStep(ingredient: Ingredient, value: number, unit: string, original: number, requested: number, locale: string): string {
  if (ingredient.scaling === "to-taste" || ingredient.amount.text) return ingredient.amount.text ?? "a gusto";
  const factor = ingredient.scaling === "fixed" ? 1 : ingredient.scaling === "batch" ? Math.max(1, Math.ceil(requested / original)) : requested / original;
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value * factor)} ${unit}`;
}

function TimerControl({ step, timer, now, onChange, onStart }: { step: RecipeStep; timer?: TimerState; now: number; onChange: (timer: TimerState) => void; onStart?: () => void }) {
  if (!timer) return <div className="step-rhythm"><span>Ritmo</span><strong>Guiate por la señal física</strong></div>;
  const remaining = remainingMs(timer, now);
  const running = isRunning(timer) && remaining > 0;
  const progress = timerProgress(timer, now);
  const timerStyle = { "--timer-progress": `${progress.percent}%` } as CSSProperties;
  const update = async (next: TimerState) => {
    onChange(next);
    await selectionHaptic();
    if (next.dueAt) {
      onStart?.();
      await scheduleTimerNotification(next, step.timer?.label ?? step.action);
    }
    else await cancelTimerNotification(next.notificationId);
  };
  return <div className={`step-timer timer-${progress.phase} ${running ? "running" : ""} ${remaining === 0 ? "finished" : ""} ${remaining > 0 && remaining <= 5000 ? "timer-near-end" : ""}`} style={timerStyle}>
    <div><span>{step.timer?.label}</span><strong className="flowing-time">{formatDuration(remaining)}</strong><small>{progress.percent} % consumido</small></div>
    <div className="timer-actions">
      <button onClick={() => update(running ? pauseTimer(timer) : startTimer(timer))}>{running ? "Pausar" : remaining === 0 ? "Reiniciar" : "Iniciar"}</button>
      <button onClick={() => update(addTime(timer, 30_000))}>+30 s</button>
    </div>
  </div>;
}

function Sheet({ children, onClose, labelledBy }: { children: React.ReactNode; onClose: () => void; labelledBy: string }) {
  return <div className="sheet-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}><section className="sheet" role="dialog" aria-modal="true" aria-labelledby={labelledBy}>{children}</section></div>;
}

function IngredientsView({ session, setServings, toggleMissing }: { session: ActiveSession; setServings: (count: number) => void; toggleMissing: (ingredientId: string) => void }) {
  const { recipe, servings } = session;
  const missingIds = session.missingIngredientIds ?? [];
  const ingredientCard = (ingredient: Ingredient, suffix = "", role?: ComponentRole) => {
    const scaled = scaledQuantity(ingredient, recipe.servings.count, servings, recipe.locale);
    const missing = missingIds.includes(ingredient.id);
    return <button className={`ingredient ${missing ? "missing" : ""}`} style={ingredientStyle(missing)} key={`${ingredient.id}-${suffix}`} onClick={() => toggleMissing(ingredient.id)} aria-pressed={missing}>
      <IngredientGlyph ingredient={ingredient} role={role} /><div><strong>{ingredient.name}</strong>{missing ? <small>Falta</small> : ingredient.optional ? <small>Opcional</small> : <small>Disponible</small>}{scaled.note && <small>{scaled.note}</small>}</div><b>{scaled.amount}</b>
    </button>;
  };
  const componentIngredients = recipe.components.map(component => {
    const ids = new Set(recipe.steps.filter(step => step.componentId === component.id).flatMap(step => step.amounts.map(amount => amount.ingredientId)));
    return { component, ingredients: recipe.ingredients.filter(ingredient => ids.has(ingredient.id)) };
  }).filter(group => group.ingredients.length > 0);
  return <main className="ingredients-tab" aria-labelledby="ingredients-title">
    <div className="ingredients-heading"><div><p className="eyebrow green">Un lenguaje claro y consistente</p><h1 id="ingredients-title">Ingredientes</h1><p>Tocá un ingrediente para alternar entre disponible y faltante.</p></div></div>
    <div className="servings-control"><div><span>Estimación para</span><strong>{servings} {servings === 1 ? "persona" : "personas"}</strong></div><div><button onClick={() => setServings(Math.max(1, servings - 1))}>−</button><button onClick={() => setServings(Math.min(12, servings + 1))}>+</button></div></div>
    <section className="ingredient-section"><h2><span>∑</span> Total de la receta</h2><div className="ingredients-list">{recipe.ingredients.map(ingredient => ingredientCard(ingredient, "total", componentRole(ingredientComponent(recipe, ingredient.id))))}</div></section>
    <section className="ingredient-section ingredient-stations"><h2><span>↳</span> Preparación por estación</h2>{componentIngredients.map(({ component, ingredients }) => { const role = componentRole(component); return <div className="ingredient-group" key={component.id}><h3 style={componentStyle(role)}>{component.title}</h3><div className="ingredients-list">{ingredients.map(ingredient => ingredientCard(ingredient, component.id, role))}</div></div>; })}</section>
    <p className="ingredients-note">Las cantidades “a gusto”, fijas o por tanda conservan la regla indicada por la receta para no multiplicarlas de forma engañosa.</p>
  </main>;
}

function CookView({ session, setSession, onFinish, installEvent }: { session: ActiveSession; setSession: React.Dispatch<React.SetStateAction<ActiveSession | undefined>>; onFinish: () => void; installEvent?: InstallEvent }) {
  const [now, setNow] = useState(Date.now());
  const [tab, setTab] = useState<"recipe" | "ingredients">("recipe");
  const [sheet, setSheet] = useState<"options" | "alerts" | "step" | "timer" | "session-clock" | null>(null);
  const [sheetStepId, setSheetStepId] = useState<string>();
  const [readiness, setReadiness] = useState<NotificationReadiness>("web-only");
  const [silentReady, setSilentReady] = useState(false);
  const [orientationPulse, setOrientationPulse] = useState(false);
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>();
  const [secondaryCollapsed, setSecondaryCollapsed] = useState(false);
  const [showGestureHint, setShowGestureHint] = useState(false);
  const [reader, setReader] = useState({ active: false, playing: false, stepIndex: 0 });
  const [showOrientationHint, setShowOrientationHint] = useState(() => localStorage.getItem("mise-orientation-hint") !== "seen");
  const mainRef = useRef<HTMLDivElement>(null);
  const scrollTimer = useRef<number | undefined>(undefined);
  const suppressScroll = useRef(false);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const suppressSwipeClick = useRef(false);
  const gesture = useRef<{ stepId: string; side: "left" | "right"; pointerId: number; x: number; y: number; at: number; scrollTop: number; moved: boolean; opened: boolean; timer?: number } | undefined>(undefined);
  const lastRightTap = useRef<{ stepId: string; at: number; x: number; y: number; timer?: number } | undefined>(undefined);
  const timerHold = useRef<{ stepId: string; x: number; y: number; opened: boolean; timer?: number } | undefined>(undefined);
  const jumpHold = useRef<{ repeated: boolean; delay?: number; interval?: number } | undefined>(undefined);
  const secondaryScrollTop = useRef(0);
  const recipe = session.recipe;
  const currentIndex = Math.max(0, recipe.steps.findIndex(step => step.id === session.selectedStepId));
  const currentIndexRef = useRef(currentIndex);
  const readerRef = useRef(reader);
  currentIndexRef.current = currentIndex;
  readerRef.current = reader;

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 250);
    enterKitchenDisplay();
    notificationReadiness().then(setReadiness);
    configureSilentAlarmChannel().then(setSilentReady).finally(() => configureNotificationChannel());
    setOrientationLocked(Boolean(session.orientationLocked));
    const visible = () => {
      if (document.visibilityState === "visible") {
        enterKitchenDisplay();
        notificationReadiness().then(setReadiness);
        configureSilentAlarmChannel().then(setSilentReady);
      }
    };
    document.addEventListener("visibilitychange", visible);
    return () => { clearInterval(id); document.removeEventListener("visibilitychange", visible); };
  }, [session.orientationLocked]);

  useEffect(() => {
    let active = true;
    const refresh = () => getDeviceStatus().then(status => {
      if (active) setDeviceStatus(status);
    });
    refresh();
    const id = window.setInterval(refresh, 30_000);
    return () => { active = false; window.clearInterval(id); };
  }, []);

  useEffect(() => {
    if (readiness !== "native-ready") return;
    recipe.steps.forEach(candidate => {
      const timer = session.timers[candidate.id];
      if (timer?.dueAt) scheduleTimerNotification(timer, candidate.timer?.label ?? candidate.action);
    });
  }, [readiness, recipe.steps, session.timers]);

  const selectStep = useCallback((index: number, haptic = true) => {
    const next = recipe.steps[index];
    if (!next || next.id === session.selectedStepId) return;
    setSession(previous => previous ? { ...previous, selectedStepId: next.id, updatedAt: Date.now() } : previous);
    if (haptic) selectionHaptic();
  }, [recipe.steps, session.selectedStepId, setSession]);

  const scrollTo = useCallback((index: number, haptic = true, behavior: ScrollBehavior = "smooth") => {
    const node = mainRef.current?.querySelector<HTMLElement>(`[data-recipe-step="${index}"]`);
    node?.scrollIntoView({ behavior, block: "start", inline: "nearest" });
    selectStep(index, haptic);
  }, [selectStep]);

  const readerText = useCallback((index: number) => {
    const candidate = recipe.steps[index];
    if (!candidate) return "";
    const quantities = candidate.amounts.map(amount => {
      const ingredient = recipe.ingredients.find(item => item.id === amount.ingredientId);
      return ingredient ? `${ingredient.name}, ${amountForStep(ingredient, amount.value, amount.unit, recipe.servings.count, session.servings, recipe.locale)}` : "";
    }).filter(Boolean).join("; ");
    const warnings = candidate.avoid.length ? `Cuidado: ${candidate.avoid.join(". ")}` : "";
    return [`Paso ${index + 1}. ${candidate.voice || candidate.action}`, quantities && `Vas a usar ${quantities}.`, `Empezá cuando ${candidate.startWhen}`, `Está listo cuando ${candidate.doneWhen.map(cue => cue.cue).join(". ")}.`, warnings].filter(Boolean).join(" ");
  }, [recipe, session.servings]);

  const playReaderStep = useCallback(async (index: number) => {
    const safeIndex = Math.max(0, Math.min(recipe.steps.length - 1, index));
    setReader({ active: true, playing: true, stepIndex: safeIndex });
    const ok = await speak(readerText(safeIndex), recipe.locale, `mise-global-${safeIndex}`);
    if (!ok) setReader(previous => ({ ...previous, playing: false }));
  }, [recipe.locale, recipe.steps.length, readerText]);

  useEffect(() => {
    let remove: (() => Promise<void>) | undefined;
    listenForSpeechEnd(id => {
      if (!id.startsWith("mise-global-") || !readerRef.current.playing) return;
      const next = readerRef.current.stepIndex + 1;
      if (next < recipe.steps.length) void playReaderStep(next);
      else setReader({ active: false, playing: false, stepIndex: recipe.steps.length - 1 });
    }).then(listener => { remove = listener; });
    return () => { remove?.(); void stopSpeaking(); };
  }, [playReaderStep, recipe.steps.length]);

  const toggleReader = async () => {
    if (!reader.active) return playReaderStep(0);
    if (reader.playing) { await stopSpeaking(); setReader(previous => ({ ...previous, playing: false })); }
    else await playReaderStep(reader.stepIndex);
  };

  const moveReader = async (direction: -1 | 1) => {
    await stopSpeaking();
    await playReaderStep(reader.stepIndex + direction);
  };

  const stopReader = async () => {
    await stopSpeaking();
    setReader(previous => ({ ...previous, active: false, playing: false }));
  };

  useEffect(() => {
    const keepSameStep = () => {
      suppressScroll.current = true;
      setOrientationPulse(true);
      window.setTimeout(() => scrollTo(currentIndex, false, "auto"), 40);
      window.setTimeout(() => { suppressScroll.current = false; }, 280);
      window.setTimeout(() => setOrientationPulse(false), 2200);
    };
    window.addEventListener("orientationchange", keepSameStep);
    return () => window.removeEventListener("orientationchange", keepSameStep);
  }, [currentIndex, scrollTo]);

  const onMainScroll = () => {
    clearStepGesture(true);
    if (suppressScroll.current) return;
    window.clearTimeout(scrollTimer.current);
    scrollTimer.current = window.setTimeout(() => {
      const root = mainRef.current;
      if (!root) return;
      const target = root.getBoundingClientRect().top + 34;
      let nearest = 0;
      let distance = Infinity;
      root.querySelectorAll<HTMLElement>("[data-recipe-step]").forEach(node => {
        const rect = node.getBoundingClientRect();
        const nextDistance = Math.abs(rect.top - target);
        if (rect.bottom > target && nextDistance < distance) { distance = nextDistance; nearest = Number(node.dataset.recipeStep); }
      });
      selectStep(nearest, false);
    }, 130);
  };

  const setTimer = (stepId: string, next: TimerState) => setSession(previous => previous ? { ...previous, timers: { ...previous.timers, [stepId]: next }, updatedAt: Date.now() } : previous);
  const setServings = (servings: number) => { setSession(previous => previous ? { ...previous, servings, updatedAt: Date.now() } : previous); selectionHaptic(); };
  const toggleDone = (stepId: string) => {
    setSession(previous => {
      if (!previous) return previous;
      const done = previous.completedStepIds.includes(stepId);
      return { ...previous, completedStepIds: done ? previous.completedStepIds.filter(id => id !== stepId) : [...previous.completedStepIds, stepId], updatedAt: Date.now() };
    });
    selectionHaptic();
  };
  const toggleMissing = (ingredientId: string) => {
    setSession(previous => {
      if (!previous) return previous;
      const missing = previous.missingIngredientIds ?? [];
      return { ...previous, missingIngredientIds: missing.includes(ingredientId) ? missing.filter(id => id !== ingredientId) : [...missing, ingredientId], updatedAt: Date.now() };
    });
    selectionHaptic();
  };
  const openStepSheet = (stepId: string) => { setSheetStepId(stepId); setSheet("step"); selectionHaptic(); };
  const openTimerSheet = (stepId: string) => { setSheetStepId(stepId); setSheet("timer"); selectionHaptic(); };
  const onStepPointerDown = (event: ReactPointerEvent<HTMLElement>, stepId: string) => {
    if (!event.isPrimary || event.button !== 0 || (event.target as HTMLElement).closest("button, summary, details")) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const side = event.clientX < rect.left + rect.width / 2 ? "left" : "right";
    const state = { stepId, side, pointerId: event.pointerId, x: event.clientX, y: event.clientY, at: performance.now(), scrollTop: mainRef.current?.scrollTop ?? 0, moved: false, opened: false } as NonNullable<typeof gesture.current>;
    if (side === "left") state.timer = window.setTimeout(() => {
      if (!state.moved) { state.opened = true; openStepSheet(stepId); }
    }, 400);
    gesture.current = state;
    if (localStorage.getItem("mise-card-gesture-hint") !== "seen") {
      localStorage.setItem("mise-card-gesture-hint", "seen");
      setShowGestureHint(true);
      window.setTimeout(() => setShowGestureHint(false), 4200);
    }
  };
  const onStepPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const state = gesture.current;
    if (!state || state.pointerId !== event.pointerId || state.moved) return;
    if (Math.hypot(event.clientX - state.x, event.clientY - state.y) > 6) {
      state.moved = true;
      if (state.timer) window.clearTimeout(state.timer);
      clearLastRightTap();
    }
  };
  const clearLastRightTap = () => {
    if (lastRightTap.current?.timer) window.clearTimeout(lastRightTap.current.timer);
    lastRightTap.current = undefined;
  };
  const clearStepGesture = (clearTap = false) => {
    if (gesture.current?.timer) window.clearTimeout(gesture.current.timer);
    gesture.current = undefined;
    if (clearTap) clearLastRightTap();
  };
  const onStepPointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    const state = gesture.current;
    if (!state || state.pointerId !== event.pointerId) return;
    if (state.timer) window.clearTimeout(state.timer);
    const rect = event.currentTarget.getBoundingClientRect();
    const scrollDelta = Math.abs((mainRef.current?.scrollTop ?? 0) - state.scrollTop);
    const releaseInside = event.clientX >= rect.left + rect.width / 2 && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    const isTap = !state.moved && !state.opened && state.side === "right" && releaseInside && scrollDelta < 2 && performance.now() - state.at < 280;
    if (isTap) {
      const at = Date.now();
      const previousTap = lastRightTap.current;
      if (previousTap?.stepId === state.stepId && at - previousTap.at < 320 && Math.hypot(event.clientX - previousTap.x, event.clientY - previousTap.y) < 28) {
        clearLastRightTap();
        toggleDone(state.stepId);
        event.currentTarget.classList.remove("gesture-done");
        void event.currentTarget.offsetWidth;
        event.currentTarget.classList.add("gesture-done");
      } else {
        clearLastRightTap();
        const tap = { stepId: state.stepId, at, x: event.clientX, y: event.clientY } as NonNullable<typeof lastRightTap.current>;
        tap.timer = window.setTimeout(() => { if (lastRightTap.current === tap) lastRightTap.current = undefined; }, 330);
        lastRightTap.current = tap;
      }
    } else clearLastRightTap();
    gesture.current = undefined;
  };
  const applyTimerChange = async (stepId: string, next: TimerState) => {
    setTimer(stepId, next);
    const timerStep = recipe.steps.find(candidate => candidate.id === stepId);
    if (next.dueAt) await scheduleTimerNotification(next, timerStep?.timer?.label ?? timerStep?.action ?? "Cronómetro");
    else await cancelTimerNotification(next.notificationId);
  };
  const onTimerPointerDown = (event: ReactPointerEvent<HTMLElement>, stepId: string) => {
    const state = { stepId, x: event.clientX, y: event.clientY, opened: false } as NonNullable<typeof timerHold.current>;
    state.timer = window.setTimeout(() => {
      state.opened = true;
      if (stepId === "__session__") { setSheetStepId(undefined); setSheet("session-clock"); selectionHaptic(); }
      else openTimerSheet(stepId);
    }, 420);
    timerHold.current = state;
  };
  const onTimerPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const state = timerHold.current;
    if (!state) return;
    if (Math.hypot(event.clientX - state.x, event.clientY - state.y) > 9) {
      if (state.timer) window.clearTimeout(state.timer);
      timerHold.current = undefined;
    }
  };
  const onTimerPointerUp = (stepId: string) => {
    const state = timerHold.current;
    if (!state) return;
    if (state.timer) window.clearTimeout(state.timer);
    timerHold.current = undefined;
    if (!state.opened) {
      if (stepId === "__session__") toggleSessionClock();
      else scrollTo(recipe.steps.findIndex(candidate => candidate.id === stepId));
    }
  };
  const onSecondaryScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const top = event.currentTarget.scrollTop;
    const goingDown = top > secondaryScrollTop.current + 2;
    const goingUp = top < secondaryScrollTop.current - 2;
    if (goingDown && top > 10) setSecondaryCollapsed(true);
    else if (goingUp || top <= 2) setSecondaryCollapsed(false);
    secondaryScrollTop.current = top;
  };
  const jumpOne = (direction: -1 | 1) => {
    const next = Math.max(0, Math.min(recipe.steps.length - 1, currentIndexRef.current + direction));
    currentIndexRef.current = next;
    scrollTo(next);
  };
  const startJump = (direction: -1 | 1) => {
    const hold = { repeated: false } as NonNullable<typeof jumpHold.current>;
    hold.delay = window.setTimeout(() => {
      hold.repeated = true;
      jumpOne(direction);
      hold.interval = window.setInterval(() => jumpOne(direction), 1200);
    }, 520);
    jumpHold.current = hold;
  };
  const endJump = (direction: -1 | 1) => {
    const hold = jumpHold.current;
    if (!hold) return;
    if (hold.delay) window.clearTimeout(hold.delay);
    if (hold.interval) window.clearInterval(hold.interval);
    if (!hold.repeated) jumpOne(direction);
    jumpHold.current = undefined;
  };
  const cancelJump = () => {
    const hold = jumpHold.current;
    if (hold?.delay) window.clearTimeout(hold.delay);
    if (hold?.interval) window.clearInterval(hold.interval);
    jumpHold.current = undefined;
  };
  const setUpAlerts = async () => {
    let next = await notificationReadiness();
    if (next === "permission-needed") { await requestNotificationPermission(); next = await notificationReadiness(); }
    if (next === "exact-alarm-needed") await openExactAlarmSettings();
    const finalReadiness = await notificationReadiness();
    setReadiness(finalReadiness);
    if (finalReadiness === "native-ready") {
      await Promise.all(recipe.steps.map(candidate => {
        const timer = session.timers[candidate.id];
        return timer?.dueAt ? scheduleTimerNotification(timer, candidate.timer?.label ?? candidate.action) : Promise.resolve();
      }));
    }
  };
  const toggleOrientation = async () => {
    const locked = !session.orientationLocked;
    setSession(previous => previous ? { ...previous, orientationLocked: locked, updatedAt: Date.now() } : previous);
    await setOrientationLocked(locked);
    await selectionHaptic();
  };
  const toggleSessionClock = () => {
    setSession(previous => {
      if (!previous) return previous;
      const clock = previous.sessionClock ?? { accumulatedMs: 0 };
      const changedAt = Date.now();
      const sessionClock: SessionClockState = clock.runningSince
        ? { accumulatedMs: clock.accumulatedMs + Math.max(0, changedAt - clock.runningSince) }
        : { accumulatedMs: clock.accumulatedMs, runningSince: changedAt };
      return { ...previous, sessionClock, updatedAt: changedAt };
    });
    selectionHaptic();
  };
  const adjustSessionClock = (deltaMs: number) => {
    setSession(previous => previous ? { ...previous, sessionClock: { ...(previous.sessionClock ?? { accumulatedMs: 0 }), accumulatedMs: Math.max(0, (previous.sessionClock?.accumulatedMs ?? 0) + deltaMs) }, updatedAt: Date.now() } : previous);
    selectionHaptic();
  };
  const resetSessionClock = () => {
    setSession(previous => previous ? { ...previous, sessionClock: { accumulatedMs: 0 }, updatedAt: Date.now() } : previous);
    selectionHaptic();
  };
  const onStagePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    swipeStart.current = null;
    const target = event.target as HTMLElement;
    if (target.closest("input, textarea, summary, [role='dialog'], .time-ribbon, .stage-tools, .jump-buttons")) return;
    swipeStart.current = { x: event.clientX, y: event.clientY };
  };
  const onStagePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 72 || Math.abs(dx) < Math.abs(dy) * 1.6) return;
    event.preventDefault();
    suppressSwipeClick.current = true;
    window.setTimeout(() => { suppressSwipeClick.current = false; }, 0);
    setTab(dx < 0 ? "ingredients" : "recipe");
    selectionHaptic();
  };
  const widgetTimers = recipe.steps.map((candidate, index) => ({ candidate, index, timer: session.timers[candidate.id] })).filter(item => item.timer && (item.timer.dueAt || (item.timer.pausedRemainingMs ?? item.timer.durationMs) < item.timer.durationMs));
  const elapsed = sessionElapsed(session, now);
  const sessionClockRunning = Boolean(session.sessionClock?.runningSince);
  const missingIds = session.missingIngredientIds ?? [];
  const sheetStep = recipe.steps.find(candidate => candidate.id === sheetStepId);
  const sheetTimer = sheetStep ? session.timers[sheetStep.id] : undefined;
  const clockText = deviceStatus?.localTime ?? new Intl.DateTimeFormat(recipe.locale, { hour: "2-digit", minute: "2-digit" }).format(new Date(now));
  const batteryLevel = deviceStatus?.batteryLevel;
  const batteryStyle = { "--battery-level": `${batteryLevel ?? 58}%` } as CSSProperties;
  const batteryLabel = batteryLevel == null
    ? "Batería no disponible"
    : `Batería ${batteryLevel} por ciento${deviceStatus?.charging ? ", cargando" : ""}`;

  return <div className="cook-shell">
    <header className="cook-header"><span className="brand"><i /><b>Mise</b></span><span className="header-time">{clockText}</span><span className={`header-battery ${deviceStatus?.charging ? "charging" : ""}`} style={batteryStyle} aria-label={batteryLabel}><i /><b>{batteryLevel == null ? "—" : `${batteryLevel}%`}</b></span></header>
    <div className="cook-stage" onPointerDown={onStagePointerDown} onPointerUp={onStagePointerUp} onPointerCancel={() => { swipeStart.current = null; }} onClickCapture={event => { if (suppressSwipeClick.current) { event.preventDefault(); event.stopPropagation(); } }}>
    {tab === "ingredients" ? <IngredientsView session={session} setServings={setServings} toggleMissing={toggleMissing} /> : <main className="recipe-workspace">
      <aside className={`secondary-pane ${secondaryCollapsed ? "heading-collapsed" : ""}`}><div className="secondary-heading"><strong>Recorrido</strong><span>{session.completedStepIds.length}/{recipe.steps.length} hechos</span></div><div className="control-points" onScroll={onSecondaryScroll}>{recipe.steps.map((candidate, index) => { const done = session.completedStepIds.includes(candidate.id); const component = recipe.components.find(item => item.id === candidate.componentId); return <div key={candidate.id} style={componentStyle(componentRole(component))} className={`control-point ${index === currentIndex ? "active" : ""} ${done ? "done" : ""}`}><button className="point-main" onClick={() => scrollTo(index)}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{stepSummary(candidate)}</strong><small>{component?.title}</small></div>{candidate.rescues.length + candidate.avoid.length > 0 && <i aria-label="Tiene información extra">◌</i>}</button><button className={`check-step ${done ? "checked" : ""}`} onClick={() => toggleDone(candidate.id)} aria-label={done ? "Cambiar a pendiente" : "Cambiar a hecho"}>{done ? "✓" : ""}</button></div>; })}</div></aside>
      <div className="time-ribbon" aria-label="Zona de widgets"><button className={`time-cell total ${sessionClockRunning ? "running" : ""}`} onPointerDown={event => onTimerPointerDown(event, "__session__")} onPointerMove={onTimerPointerMove} onPointerUp={() => onTimerPointerUp("__session__")} onPointerCancel={() => { if (timerHold.current?.timer) clearTimeout(timerHold.current.timer); timerHold.current = undefined; }} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toggleSessionClock(); } }}><span>Total de sesión</span><strong className="flowing-time">{formatDuration(elapsed)}</strong><em>{sessionClockRunning ? "Pausar" : elapsed > 0 ? "Continuar" : "Empezar"}</em></button>{widgetTimers.map(({ candidate, timer }) => { const progress = timerProgress(timer, now); const remaining = remainingMs(timer, now); const style = { "--timer-progress": `${progress.percent}%` } as CSSProperties; return <button key={candidate.id} className={`time-cell part timer-${progress.phase} ${isRunning(timer) ? "running" : "paused"} ${remaining > 0 && remaining <= 5000 ? "timer-near-end" : ""}`} style={style} onPointerDown={event => onTimerPointerDown(event, candidate.id)} onPointerMove={onTimerPointerMove} onPointerUp={() => onTimerPointerUp(candidate.id)} onPointerCancel={() => { if (timerHold.current?.timer) clearTimeout(timerHold.current.timer); timerHold.current = undefined; }} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); scrollTo(recipe.steps.findIndex(item => item.id === candidate.id)); } }}><span>{candidate.timer?.label ?? stepSummary(candidate)}</span><strong className="flowing-time">{formatDuration(remaining)}</strong><em>{remaining === 0 ? "Listo" : isRunning(timer) ? `${progress.percent} %` : "Pausado"}</em></button>; })}{widgetTimers.length === 0 && !reader.active && <div className="time-cell empty"><span>Temporizadores</span><strong>Sin relojes activos</strong><small>Iniciá uno dentro de un paso.</small></div>}{reader.active && <div className="reader-widget"><span>Lectura de receta</span><b>{String(reader.stepIndex + 1).padStart(2, "0")} · {stepSummary(recipe.steps[reader.stepIndex])}</b><div><button onClick={() => moveReader(-1)} disabled={reader.stepIndex === 0} aria-label="Lectura anterior">◀</button><button onClick={toggleReader}>{reader.playing ? "Pausa" : "Seguir"}</button><button onClick={() => moveReader(1)} disabled={reader.stepIndex === recipe.steps.length - 1} aria-label="Lectura siguiente">▶</button><button onClick={stopReader} aria-label="Detener lectura">■</button></div></div>}</div>
      <section className="recipe-document" ref={mainRef} onScroll={onMainScroll} aria-label="Receta completa"><div className="document-intro"><p className="eyebrow green">Receta completa · desplazamiento libre</p><h1>{recipe.title}</h1><p>{recipe.context.goal}</p><button className="global-reader" onClick={() => playReaderStep(0)}>▶ Leer receta completa</button></div>{recipe.steps.map((candidate, index) => {
        const done = session.completedStepIds.includes(candidate.id);
        const station = recipe.components.find(item => item.id === candidate.componentId);
        return <article style={componentStyle(componentRole(station))} className={`recipe-step ${index === currentIndex ? "current" : ""} ${done ? "done" : ""}`} data-recipe-step={index} key={candidate.id} onPointerDown={event => onStepPointerDown(event, candidate.id)} onPointerMove={onStepPointerMove} onPointerUp={onStepPointerUp} onPointerCancel={() => clearStepGesture(true)}><header><div><span className="step-number">{String(index + 1).padStart(2, "0")}</span><span className="station-name">{station?.title}</span>{candidate.heat && <span className="heat-chip">{candidate.heat}</span>}</div><button className={`document-check ${done ? "checked" : ""}`} onClick={() => toggleDone(candidate.id)}>{done ? "✓ Hecho" : "Pendiente"}</button></header><h2><IngredientText text={candidate.action} recipe={recipe} missingIds={missingIds} /></h2>{candidate.amounts.length > 0 && <div className="step-ingredients">{candidate.amounts.map(amount => { const ingredient = recipe.ingredients.find(item => item.id === amount.ingredientId); if (!ingredient) return null; const missing = missingIds.includes(ingredient.id); return <span className={`ingredient-token ${missing ? "missing" : ""}`} style={{ ...ingredientStyle(missing), ...componentStyle(componentRole(station)) }} key={amount.ingredientId}><IngredientGlyph ingredient={ingredient} role={componentRole(station)} /><b>{ingredient.name}</b><em>{amountForStep(ingredient, amount.value, amount.unit, recipe.servings.count, session.servings, recipe.locale)}</em></span>; })}</div>}<div className="step-cues"><div><span>Empezá cuando</span><strong><IngredientText text={candidate.startWhen} recipe={recipe} missingIds={missingIds} /></strong></div><div className="ready-cue"><span>Está listo cuando</span><strong><IngredientText text={candidate.doneWhen.map(cue => cue.cue).join(" · ")} recipe={recipe} missingIds={missingIds} /></strong></div></div><TimerControl step={candidate} timer={session.timers[candidate.id]} now={now} onChange={next => setTimer(candidate.id, next)} onStart={() => { if (readiness !== "native-ready" && readiness !== "web-only") setSheet("alerts"); }} />{(candidate.avoid.length > 0 || candidate.rescues.length > 0) && <details className="extra-bubble"><summary>Información extra</summary>{candidate.avoid.map(item => <p key={item}><b>Evitá:</b> <IngredientText text={item} recipe={recipe} missingIds={missingIds} /></p>)}{candidate.rescues.map(item => <p key={item.when}><b>{item.when}:</b> <IngredientText text={item.do} recipe={recipe} missingIds={missingIds} /></p>)}</details>}</article>;
      })}<div className="document-end"><span>Fin de la receta</span><p>Podés volver a cualquier punto sin cambiar los estados ni los relojes.</p></div></section><div className="jump-buttons"><button disabled={currentIndex === 0} onPointerDown={() => startJump(-1)} onPointerUp={() => endJump(-1)} onPointerCancel={cancelJump} onPointerLeave={cancelJump} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); jumpOne(-1); } }} aria-label="Paso anterior; mantener para recorrer">↑</button><button disabled={currentIndex === recipe.steps.length - 1} onPointerDown={() => startJump(1)} onPointerUp={() => endJump(1)} onPointerCancel={cancelJump} onPointerLeave={cancelJump} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); jumpOne(1); } }} aria-label="Paso siguiente; mantener para recorrer">↓</button></div>
    </main>}
    <nav className="stage-tools" aria-label="Herramientas de la cocina"><button className="view-toggle" onClick={() => setTab(tab === "recipe" ? "ingredients" : "recipe")}>{tab === "recipe" ? `Ingredientes · ${session.servings}p` : "Receta"}</button><div className="orientation-control"><button className={`orientation-lock ${session.orientationLocked ? "locked" : ""} ${orientationPulse ? "pulse" : ""}`} onClick={() => { toggleOrientation(); localStorage.setItem("mise-orientation-hint", "seen"); setShowOrientationHint(false); }} aria-pressed={session.orientationLocked} aria-label={session.orientationLocked ? "Desbloquear orientación automática" : `Bloquear vista ${currentOrientation()}`}><OrientationIcon locked={Boolean(session.orientationLocked)} /></button>{showOrientationHint && <span className="orientation-label">Giro automático</span>}</div><button className="more-button" onClick={() => setSheet("options")} aria-label="Más opciones">•••</button></nav>
    </div>
    {sheet === "options" && <Sheet onClose={() => setSheet(null)} labelledBy="options-title"><div className="sheet-heading"><div><p className="eyebrow green">Fuera del flujo principal</p><h2 id="options-title">Opciones</h2></div><button className="icon-button" onClick={() => setSheet(null)}>×</button></div><div className="option-list"><button onClick={() => enterKitchenDisplay()}>Pantalla completa <span>Oculta controles del navegador</span></button><button onClick={() => setSheet("alerts")}>Alarmas y sonido <span>{readiness === "native-ready" ? "Alarmas exactas listas" : "Requiere configuración"} · {silentReady ? "pueden atravesar No molestar" : "respetan el modo silencio"}</span></button>{installEvent && <button onClick={() => installEvent.prompt()}>Instalar aplicación <span>Usar sin barras del navegador</span></button>}<button className="quiet-danger" onClick={onFinish}>Cerrar receta actual <span>Borra esta única sesión del teléfono</span></button></div></Sheet>}
    {sheet === "alerts" && <Sheet onClose={() => setSheet(null)} labelledBy="alerts-title"><div className="sheet-heading"><div><p className="eyebrow green">Configuración del teléfono</p><h2 id="alerts-title">Alarmas persistentes</h2></div><button className="icon-button" onClick={() => setSheet(null)}>×</button></div><p>Los relojes se recuperan siempre. Estos permisos permiten que además avisen fuera de Mise.</p><div className="permission-list"><button onClick={setUpAlerts}><b>{readiness === "native-ready" ? "✓" : "1"}</b><span><strong>Notificaciones y hora exacta</strong><small>Para avisar con la aplicación cerrada.</small></span></button><button onClick={async () => { await requestSilentAlarmAccess(); }}><b>{silentReady ? "✓" : "2"}</b><span><strong>Sonar en silencio o No molestar</strong><small>Android mostrará un permiso especial. El volumen de alarmas sigue bajo tu control.</small></span></button></div></Sheet>}
    {sheet === "step" && sheetStep && <Sheet onClose={() => setSheet(null)} labelledBy="step-options-title"><div className="sheet-heading"><div><p className="eyebrow green">Paso {String(recipe.steps.indexOf(sheetStep) + 1).padStart(2, "0")}</p><h2 id="step-options-title">{stepSummary(sheetStep)}</h2></div><button className="icon-button" onClick={() => setSheet(null)}>×</button></div><div className="option-list"><button onClick={() => speak(readerText(recipe.steps.indexOf(sheetStep)), recipe.locale, `mise-step-${sheetStep.id}`)}>Escuchar este paso <span>Lee solo esta acción y su señal de punto.</span></button><button onClick={() => { void playReaderStep(recipe.steps.indexOf(sheetStep)); setSheet(null); }}>Leer desde aquí <span>Continúa con los pasos siguientes.</span></button><button onClick={() => { setTab("ingredients"); setSheet(null); }}>Ver ingredientes <span>Abre cantidades totales y por estación.</span></button>{sheetTimer && <button onClick={() => openTimerSheet(sheetStep.id)}>Controlar temporizador <span>{formatDuration(remainingMs(sheetTimer, now))}</span></button>}<button onClick={() => { toggleDone(sheetStep.id); setSheet(null); }}>{session.completedStepIds.includes(sheetStep.id) ? "Cambiar a pendiente" : "Cambiar a hecho"}<span>No mueve el documento.</span></button></div></Sheet>}
    {sheet === "timer" && sheetStep && sheetTimer && <Sheet onClose={() => setSheet(null)} labelledBy="timer-options-title"><div className="sheet-heading"><div><p className="eyebrow green">{sheetStep.timer?.label ?? "Temporizador"}</p><h2 id="timer-options-title">{formatDuration(remainingMs(sheetTimer, now))}</h2></div><button className="icon-button" onClick={() => setSheet(null)}>×</button></div><div className="timer-sheet-actions"><button onClick={() => applyTimerChange(sheetStep.id, isRunning(sheetTimer) ? pauseTimer(sheetTimer) : startTimer(sheetTimer))}>{isRunning(sheetTimer) ? "Pausar" : "Continuar"}</button><button onClick={() => applyTimerChange(sheetStep.id, addTime(sheetTimer, 30_000))}>+30 s</button><button onClick={() => applyTimerChange(sheetStep.id, addTime(sheetTimer, -30_000))}>−30 s</button><button onClick={() => applyTimerChange(sheetStep.id, startTimer(createTimer(sheetStep.id, sheetTimer.durationMs / 1000, sheetTimer.notificationId)))}>Reiniciar</button><button onClick={() => { applyTimerChange(sheetStep.id, createTimer(sheetStep.id, sheetTimer.durationMs / 1000, sheetTimer.notificationId)); setSheet(null); }}>Cancelar</button><button onClick={() => { scrollTo(recipe.steps.indexOf(sheetStep)); setSheet(null); }}>Volver al paso</button></div></Sheet>}
    {sheet === "session-clock" && <Sheet onClose={() => setSheet(null)} labelledBy="session-clock-title"><div className="sheet-heading"><div><p className="eyebrow green">Total de sesión</p><h2 id="session-clock-title">{formatDuration(elapsed)}</h2></div><button className="icon-button" onClick={() => setSheet(null)}>×</button></div><div className="timer-sheet-actions"><button onClick={toggleSessionClock}>{sessionClockRunning ? "Pausar" : "Continuar"}</button><button onClick={() => adjustSessionClock(60_000)}>+1 min</button><button onClick={() => adjustSessionClock(-60_000)}>−1 min</button><button onClick={resetSessionClock}>Reiniciar</button></div></Sheet>}
    {showGestureHint && <div className="gesture-hint" role="status"><b>Atajos de los pasos</b><span>Mantené la mitad izquierda para opciones · doble toque a la derecha para Pendiente/Hecho.</span></div>}
  </div>;
}

export default function App() {
  const [view, setView] = useState<View>("import");
  const [pending, setPending] = useState<MiseRecipe>();
  const [warnings, setWarnings] = useState<string[]>([]);
  const [session, setSession] = useState<ActiveSession>();
  const [loading, setLoading] = useState(true);
  const [installEvent, setInstallEvent] = useState<InstallEvent>();
  const [recent, setRecent] = useState<RecentRecipe[]>([]);

  useEffect(() => {
    Promise.all([loadActiveSession(), loadRecentRecipes()]).then(([saved, storedRecent]) => {
      setRecent(storedRecent);
      if (saved) { setSession({ ...saved, completedStepIds: saved.completedStepIds ?? [], missingIngredientIds: saved.missingIngredientIds ?? [], sessionClock: saved.sessionClock ?? { accumulatedMs: 0 } }); setView("cook"); }
    }).finally(() => setLoading(false));
    const capture = (event: Event) => { event.preventDefault(); setInstallEvent(event as InstallEvent); };
    window.addEventListener("beforeinstallprompt", capture);
    return () => window.removeEventListener("beforeinstallprompt", capture);
  }, []);

  useEffect(() => {
    let stop: (() => Promise<void>) | undefined;
    listenForTimerNotificationActions(action => {
      if (action.action !== "open" || !action.stepId) return;
      loadActiveSession().then(saved => {
        if (!saved || !saved.recipe.steps.some(step => step.id === action.stepId)) return;
        setSession({ ...saved, selectedStepId: action.stepId!, completedStepIds: saved.completedStepIds ?? [], missingIngredientIds: saved.missingIngredientIds ?? [], sessionClock: saved.sessionClock ?? { accumulatedMs: 0 }, updatedAt: Date.now() });
        setView("cook");
      });
    }).then(handle => { stop = handle ? () => handle.remove() : undefined; });
    return () => { stop?.(); };
  }, []);

  useEffect(() => {
    if (!session) return;
    const id = window.setTimeout(() => saveActiveSession(session), 120);
    return () => clearTimeout(id);
  }, [session]);

  const acceptRecipe = useCallback((recipe: MiseRecipe, nextWarnings: string[]) => {
    setPending(recipe); setWarnings(nextWarnings); setView("review");
  }, []);

  useEffect(() => {
    let stop: (() => Promise<void>) | undefined;
    listenForNativeRecipes(text => {
      const result = parseRecipeInput(text);
      if (result.ok) acceptRecipe(result.recipe, result.warnings);
    }).then(listener => { stop = listener; });
    return () => { stop?.(); };
  }, [acceptRecipe]);

  const start = async (servings: number, missingIds: string[]) => {
    if (!pending) return;
    const next = makeSession(pending, servings, missingIds);
    setSession(next); await saveActiveSession(next); setRecent(await rememberRecipe(pending)); setView("cook"); await enterKitchenDisplay();
  };

  const finish = async () => {
    if (session) await Promise.all(Object.values(session.timers).map(timer => cancelTimerNotification(timer.notificationId)));
    await clearActiveSession(); await leaveKitchenDisplay(); setSession(undefined); setPending(undefined); setView("import");
  };

  const content = useMemo(() => {
    if (loading) return <div className="loading"><span className="brand"><i />Mise</span><p>Recuperando la mesada…</p></div>;
    if (view === "review" && pending) return <ReviewView recipe={pending} warnings={warnings} onBack={() => setView("import")} onStart={start} />;
    if (view === "cook" && session) return <CookView session={session} setSession={setSession} onFinish={finish} installEvent={installEvent} />;
    return <ImportView onRecipe={acceptRecipe} recent={recent} />;
  }, [loading, view, pending, warnings, session, installEvent, recent]);

  return content;
}
