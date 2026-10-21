import type { ComponentRole, IngredientKind, MiseRecipe, RecipeStep, ScalingPolicy } from "../types";

export type IngredientSpec = [
  id: string,
  name: string,
  value: number | string,
  unit: string,
  kind: IngredientKind,
  optional?: boolean,
  scaling?: ScalingPolicy
];

export type ComponentSpec = [id: string, title: string, role: ComponentRole];
type Sense = RecipeStep["doneWhen"][number]["sense"];

export type StepOptions = {
  heat?: string;
  seconds?: number;
  avoid?: string[];
  rescues?: Array<[when: string, action: string]>;
  parallel?: string[];
  depends?: string[];
  cues?: Array<[sense: Sense, cue: string]>;
};

export type RecipeNotes = {
  constraints?: string[];
  decisions?: string[];
  uncertainties?: string[];
  storage?: string;
  reheat?: string;
};

function makeIngredients(specs: IngredientSpec[]): MiseRecipe["ingredients"] {
  return specs.map(([id, name, value, unit, kind, optional, scaling]) => ({
    id,
    name,
    kind,
    optional,
    amount: typeof value === "string" ? { text: value } : { value, unit },
    scaling: scaling ?? (typeof value === "string" ? "to-taste" : "linear")
  }));
}

export function makeStep(
  id: string,
  componentId: string,
  shortLabel: string,
  action: string,
  used: Array<[string, number, string]>,
  startWhen: string,
  doneWhen: string,
  options: StepOptions = {}
): RecipeStep {
  return {
    id,
    componentId,
    shortLabel,
    action,
    amounts: used.map(([ingredientId, value, unit]) => ({ ingredientId, value, unit })),
    heat: options.heat,
    startWhen,
    doneWhen: (options.cues ?? [["visual", doneWhen]]).map(([sense, cue]) => ({ sense, cue })),
    timer: options.seconds ? { label: shortLabel, durationSeconds: options.seconds, startTrigger: "user-confirmed" } : undefined,
    dependsOn: options.depends ?? [],
    canRunWith: options.parallel ?? [],
    avoid: options.avoid ?? [],
    rescues: (options.rescues ?? []).map(([when, action]) => ({ when, do: action })),
    voice: `${action} Está listo cuando ${doneWhen}`
  };
}

export function makeRecipe(
  id: string,
  title: string,
  goal: string,
  count: number,
  componentSpecs: ComponentSpec[],
  ingredientSpecs: IngredientSpec[],
  steps: RecipeStep[],
  equipment: string[],
  notes: RecipeNotes = {}
): MiseRecipe {
  return {
    format: "mise.recipe",
    version: "1.2",
    recipeId: `precargada.${id}`,
    revision: 2,
    locale: "es-AR",
    title,
    servings: { count },
    context: {
      goal,
      equipment,
      constraints: notes.constraints ?? ["Ingredientes accesibles en Argentina"],
      dietary: [],
      availableIngredients: [],
      decisions: notes.decisions ?? ["Versión precargada, revisada y organizada para Mise"],
      uncertainties: notes.uncertainties ?? []
    },
    ingredients: makeIngredients(ingredientSpecs),
    components: componentSpecs.map(([componentId, componentTitle, role]) => ({ id: componentId, title: componentTitle, role })),
    steps,
    finish: {
      storage: notes.storage ?? "Enfriar antes de guardar y refrigerar en recipiente cerrado.",
      reheat: notes.reheat
    }
  };
}
