import practical from "../../prompts/chef-practico.txt?raw";
import explorer from "../../prompts/chef-explorador.txt?raw";
import technical from "../../prompts/chef-tecnico.txt?raw";
import calm from "../../prompts/chef-calmo.txt?raw";
import beginner from "../../prompts/chef-experiencia-principiante.txt?raw";
import intermediate from "../../prompts/chef-experiencia-intermedia.txt?raw";
import advanced from "../../prompts/chef-experiencia-avanzada.txt?raw";
import guideMuch from "../../prompts/chef-guia-mucha.txt?raw";
import guideNormal from "../../prompts/chef-guia-normal.txt?raw";
import guideLittle from "../../prompts/chef-guia-poca.txt?raw";
import adaptExisting from "../../prompts/adaptar-chat-existente.txt?raw";
import contract from "../../prompts/mise-output-contract.txt?raw";
import schema from "../../schema/mise-recipe.schema.json?raw";

export type ChefProfile = "practical" | "explorer" | "technical" | "calm";
export type Experience = "principiante" | "intermedio" | "avanzado";
export type Guidance = "guiame" | "proponé y decidimos" | "solo cuando haga falta";
export type ChefAnswers = { experience: Experience; priority: ChefProfile; initiative: Guidance };

/** Una respuesta posible: lo que se ve en el botón, la frase para el resumen y su bloque de prompt. */
export type ChoiceOption<T extends string = string> = { value: T; label: string; hint: string; summary: string; slug: string; block: string };

export const experienceOptions: ChoiceOption<Experience>[] = [
  { value: "principiante", label: "Principiante", hint: "Recién empiezo", summary: "te explica lo básico", slug: "principiante", block: beginner },
  { value: "intermedio", label: "Intermedia", hint: "Cocino seguido", summary: "da por sabido lo básico", slug: "intermedia", block: intermediate },
  { value: "avanzado", label: "Avanzada", hint: "Cocino con soltura", summary: "va al grano, sin lo obvio", slug: "avanzada", block: advanced }
];

export const priorityOptions: ChoiceOption<ChefProfile>[] = [
  { value: "practical", label: "Rapidez", hint: "Resolver rápido con lo que hay", summary: "resuelve rápido con lo que tenés", slug: "practico", block: practical },
  { value: "explorer", label: "Sabor", hint: "Probar combinaciones nuevas", summary: "te propone sabores y combinaciones nuevas", slug: "explorador", block: explorer },
  { value: "technical", label: "Técnica", hint: "Aprender el porqué de cada paso", summary: "te enseña el porqué de cada paso", slug: "tecnico", block: technical },
  { value: "calm", label: "Calma", hint: "Pocas cosas a la vez", summary: "te organiza para cocinar sin apuro", slug: "calmo", block: calm }
];

export const initiativeOptions: ChoiceOption<Guidance>[] = [
  { value: "guiame", label: "Mucho", hint: "Paso a paso", summary: "te lleva paso a paso", slug: "mucha-guia", block: guideMuch },
  { value: "proponé y decidimos", label: "Normal", hint: "Propone y yo elijo", summary: "te da opciones para que elijas", slug: "guia-normal", block: guideNormal },
  { value: "solo cuando haga falta", label: "Poco", hint: "Habla solo si lo pido", summary: "habla solo cuando hace falta", slug: "poca-guia", block: guideLittle }
];

export const chefNames: Record<ChefProfile, string> = { practical: "Práctico", explorer: "Explorador", technical: "Técnico", calm: "Calmo" };

function pick<T extends string>(options: ChoiceOption<T>[], value: T): ChoiceOption<T> {
  return options.find(option => option.value === value) ?? options[0];
}

/** Nombre, resumen en una frase y nombre de archivo del Chef que resulta de las tres respuestas. */
export function describeChef(answers: ChefAnswers): { name: string; summary: string; filename: string } {
  const experience = pick(experienceOptions, answers.experience);
  const priority = pick(priorityOptions, answers.priority);
  const guidance = pick(initiativeOptions, answers.initiative);
  const sentence = `${priority.summary}, ${experience.summary} y ${guidance.summary}.`;
  return {
    name: chefNames[priority.value],
    summary: sentence.charAt(0).toUpperCase() + sentence.slice(1),
    filename: `mise-chef-${priority.slug}-${experience.slug}-${guidance.slug}.txt`
  };
}

export function buildChefPrompt(answers: ChefAnswers): string {
  const chef = describeChef(answers);
  return [
    `TU CHEF PARA MISE: ${chef.name.toUpperCase()}`,
    `En una frase: ${chef.summary}`,
    "La persona eligió estas preferencias en Mise. Si durante la conversación pide otra cosa, seguí lo que pida.",
    "Los tres bloques siguientes se combinan. Si chocan, la experiencia decide cuánto explicar y la prioridad decide en qué poner el foco.",
    "",
    pick(priorityOptions, answers.priority).block.trim(),
    "",
    pick(experienceOptions, answers.experience).block.trim(),
    "",
    pick(initiativeOptions, answers.initiative).block.trim(),
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
