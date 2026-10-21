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

const profilePrompts: Record<ChefProfile, string> = { practical, explorer, technical, calm };

export function recommendProfile(answers: ChefAnswers): ChefProfile {
  if (answers.experience === "principiante" && answers.initiative === "guiame") return "calm";
  return answers.priority;
}

export function buildChefPrompt(profile: ChefProfile, answers: ChefAnswers): string {
  return [
    "CONFIGURACIÓN EDITABLE DEL USUARIO",
    `Experiencia declarada: ${answers.experience}.`,
    `Prioridad al cocinar: ${profileInfo[profile].name}.`,
    `Iniciativa esperada del ayudante: ${answers.initiative}.`,
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

export const miseSchema = schema;
