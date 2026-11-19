import Ajv2020 from "ajv/dist/2020";
import schema from "../../schema/mise-recipe.schema.json";
import type { ImportResult, MiseRecipe } from "../types";

const ajv = new Ajv2020({ allErrors: true, strict: false });
const validateSchema = ajv.compile(schema);

/** Chat assistants often wrap the JSON inside the delimiters in a ```json fence. */
function stripCodeFence(text: string): string {
  return text.replace(/^```[a-z]*\s*/i, "").replace(/\s*```$/, "").trim();
}

function extractJson(input: string): string {
  const normalized = input.trim();
  const marked = normalized.match(/---MISE\/1---\s*([\s\S]*?)\s*---END-MISE---/i);
  if (marked) return stripCodeFence(marked[1].trim());
  const fenced = normalized.match(/```(?:json)?\s*([\s\S]*?)```/i);
  return (fenced?.[1] ?? normalized).trim();
}

function semanticErrors(recipe: MiseRecipe): string[] {
  const errors: string[] = [];
  const ingredientIds = new Set(recipe.ingredients.map(item => item.id));
  const componentIds = new Set(recipe.components.map(item => item.id));
  const stepIds = new Set(recipe.steps.map(item => item.id));
  if (ingredientIds.size !== recipe.ingredients.length) errors.push("Hay ingredientes con identificadores repetidos.");
  if (componentIds.size !== recipe.components.length) errors.push("Hay preparaciones con identificadores repetidos.");
  if (stepIds.size !== recipe.steps.length) errors.push("Hay pasos con identificadores repetidos.");
  recipe.steps.forEach(step => {
    if (!componentIds.has(step.componentId)) errors.push(`El paso “${step.action}” apunta a una preparación inexistente.`);
    step.amounts.forEach(amount => {
      if (!ingredientIds.has(amount.ingredientId)) errors.push(`El paso “${step.action}” usa un ingrediente inexistente.`);
    });
    [...step.dependsOn, ...step.canRunWith].forEach(reference => {
      if (!stepIds.has(reference)) errors.push(`El paso “${step.action}” referencia el paso inexistente “${reference}”.`);
    });
  });
  return [...new Set(errors)];
}

function friendlySchemaErrors(): string[] {
  return (validateSchema.errors ?? []).slice(0, 8).map(error => {
    const location = error.instancePath || "la receta";
    // Name the offending property: it is what the person pastes back to the assistant.
    const extra = error.keyword === "additionalProperties" ? ` («${String(error.params.additionalProperty)}» no existe en el esquema; quitalo)` : "";
    const missing = error.keyword === "required" ? ` («${String(error.params.missingProperty)}» es obligatorio)` : "";
    return `${location}: ${error.message ?? "dato inválido"}${extra}${missing}`;
  });
}

/** Non-blocking order problems: a step that depends on a step that comes later in the list. */
function orderWarnings(recipe: MiseRecipe): string[] {
  const position = new Map(recipe.steps.map((step, index) => [step.id, index]));
  const warnings: string[] = [];
  recipe.steps.forEach((step, index) => {
    step.dependsOn.forEach(reference => {
      const target = position.get(reference);
      if (target !== undefined && target >= index) warnings.push(`El paso «${step.shortLabel ?? step.action}» depende de un paso que aparece después o es él mismo; revisá el orden.`);
    });
  });
  return [...new Set(warnings)];
}

export function parseRecipeInput(input: string): ImportResult {
  if (input.length > 1_000_000) return { ok: false, errors: ["La entrega supera el límite seguro de 1 MB."] };
  try {
    const parsed: unknown = JSON.parse(extractJson(input));
    if (!validateSchema(parsed)) return { ok: false, errors: friendlySchemaErrors() };
    const recipe = parsed as MiseRecipe;
    const errors = semanticErrors(recipe);
    if (errors.length) return { ok: false, errors };
    const warnings = [...recipe.context.uncertainties.map(item => `Pendiente: ${item}`), ...orderWarnings(recipe)];
    if (!recipe.ingredients.length) warnings.push("La receta no contiene ingredientes para mostrar.");
    return { ok: true, recipe, warnings };
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo leer el contenido";
    return { ok: false, errors: [`El contenido no es JSON válido: ${message}`] };
  }
}

export async function readRecipeFile(file: File): Promise<ImportResult> {
  if (file.size > 1_000_000) return { ok: false, errors: ["El archivo supera el límite de 1 MB."] };
  return parseRecipeInput(await file.text());
}
