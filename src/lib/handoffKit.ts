import practical from "../../prompts/chef-practico.txt?raw";
import explorer from "../../prompts/chef-explorador.txt?raw";
import technical from "../../prompts/chef-tecnico.txt?raw";
import calm from "../../prompts/chef-calmo.txt?raw";
import adaptExisting from "../../prompts/adaptar-chat-existente.txt?raw";
import contract from "../../prompts/mise-output-contract.txt?raw";
import schema from "../../schema/mise-recipe.schema.json?raw";

export type ChefProfile = "practical" | "explorer" | "technical" | "calm";
export type ChefAnswers = { experience: string; priority: ChefProfile; initiative: string };

export const profileInfo: Record<ChefProfile, { name: string; description: string }> = {
  practical: { name: "Práctico", description: "Resuelve rápido con lo que tenés." },
  explorer: { name: "Explorador", description: "Propone sabores y variantes con criterio." },
  technical: { name: "Técnico", description: "Enseña técnica y señales de cocción." },
  calm: { name: "Calmo", description: "Guía sin sobrecargar y anticipa el trabajo." }
};

export type ChoiceOption<T extends string = string> = { value: T; label: string; hint: string; prompt: string };

export const experienceOptions: ChoiceOption[] = [
  { value: "principiante", label: "Principiante", hint: "Recién empiezo", prompt: "principiante; explicá lo básico" },
  { value: "intermedio", label: "Intermedia", hint: "Cocino seguido", prompt: "intermedia; no hace falta explicar lo básico" },
  { value: "avanzado", label: "Avanzada", hint: "Cocino con soltura", prompt: "avanzada; no expliques lo obvio" }
];

export const priorityOptions: ChoiceOption<ChefProfile>[] = [
  { value: "practical", label: "Rapidez", hint: "Resolver rápido con lo que hay", prompt: "" },
  { value: "explorer", label: "Sabor", hint: "Probar combinaciones nuevas", prompt: "" },
  { value: "technical", label: "Técnica", hint: "Aprender el porqué de cada paso", prompt: "" },
  { value: "calm", label: "Calma", hint: "Pocas cosas a la vez", prompt: "" }
];

export const initiativeOptions: ChoiceOption[] = [
  { value: "guiame", label: "Mucho", hint: "Paso a paso", prompt: "guiame paso a paso sin que yo tenga que preguntar" },
  { value: "proponé y decidimos", label: "Normal", hint: "Propone y yo elijo", prompt: "proponé opciones y yo elijo" },
  { value: "solo cuando haga falta", label: "Poco", hint: "Habla solo si lo pido", prompt: "intervení solo cuando te lo pida o haga falta" }
];

function promptText(options: ChoiceOption[], value: string): string {
  return options.find(option => option.value === value)?.prompt ?? value;
}

const profilePrompts: Record<ChefProfile, string> = { practical, explorer, technical, calm };

export function recommendProfile(answers: ChefAnswers): ChefProfile {
  if (answers.experience === "principiante" && answers.initiative === "guiame") return "calm";
  return answers.priority;
}

export function buildChefPrompt(profile: ChefProfile, answers: ChefAnswers): string {
  return [
    "CONFIGURACIÓN EDITABLE DEL USUARIO",
    `Experiencia en cocina: ${promptText(experienceOptions, answers.experience)}.`,
    `Prioridad al cocinar: ${profileInfo[profile].name}.`,
    `Cuánto guiar: ${promptText(initiativeOptions, answers.initiative)}.`,
    "Podés corregir o ampliar estas preferencias durante la conversación.",
    "",
    profilePrompts[profile].trim(),
    "",
    "Al comenzar una receta nueva, averiguá de forma conversacional qué ingredientes hay, cuántas personas comen, restricciones, tiempo disponible y sabores buscados. No repitas preguntas ya respondidas ni hagas un cuestionario completo si no hace falta.",
    "",
    contract.trim()
  ].join("\n");
}

export function buildAdapterPrompt(): string {
  return `${adaptExisting.trim()}\n\n${contract.trim()}`;
}

/** For long chats: the request plus the full contract, so it does not depend on messages far back. */
export function buildDeliveryPrompt(): string {
  return `Pasala a Mise. Aplicá este contrato ahora y respondé solo con el bloque pedido.\n\n${contract.trim()}`;
}

export const miseSchema = schema;
