export type Quantity = {
  value?: number;
  min?: number;
  max?: number;
  text?: string;
  unit?: string;
};

export type ScalingPolicy = "linear" | "batch" | "to-taste" | "fixed";
export type IngredientKind = "protein" | "vegetable" | "grain" | "liquid" | "seasoning" | "fat" | "dairy" | "other";
export type ComponentRole = "main" | "sauce" | "garnish" | "salad" | "drink" | "dessert" | "topping" | "other";

export type Ingredient = {
  id: string;
  name: string;
  amount: Quantity;
  optional?: boolean;
  scaling?: ScalingPolicy;
  scalingNote?: string;
  kind?: IngredientKind;
};

export type Component = {
  id: string;
  title: string;
  role?: ComponentRole;
  preferredStation?: string;
  hold?: { mode?: string; qualityWindowMinutes?: number };
};

export type StepAmount = {
  ingredientId: string;
  value: number;
  unit: string;
};

export type Cue = {
  sense: "visual" | "texture" | "smell" | "taste" | "sound" | "time" | "temperature";
  cue: string;
};

export type RecipeStep = {
  id: string;
  componentId: string;
  shortLabel?: string;
  status?: "pending" | "available" | "active" | "waiting" | "done" | "blocked";
  action: string;
  amounts: StepAmount[];
  heat?: string;
  startWhen: string;
  doneWhen: Cue[];
  timer?: { label: string; durationSeconds: number; startTrigger: "user-confirmed" };
  dependsOn: string[];
  canRunWith: string[];
  avoid: string[];
  rescues: Array<{ when: string; do: string }>;
  voice: string;
};

export type MiseRecipe = {
  format: "mise.recipe";
  version: string;
  recipeId: string;
  revision: number;
  locale: string;
  title: string;
  servings: { count: number; note?: string };
  context: {
    goal: string;
    equipment: string[];
    constraints: string[];
    dietary: string[];
    availableIngredients: string[];
    decisions: string[];
    uncertainties: string[];
  };
  ingredients: Ingredient[];
  components: Component[];
  steps: RecipeStep[];
  finish: { storage?: string; transport?: string; reheat?: string };
  extensions?: Record<string, unknown>;
};

export type TimerState = {
  stepId: string;
  notificationId: number;
  dueAt?: number;
  pausedRemainingMs?: number;
  durationMs: number;
};

export type SessionClockState = {
  accumulatedMs: number;
  runningSince?: number;
};

export type ActiveSession = {
  recipe: MiseRecipe;
  selectedStepId: string;
  servings: number;
  timers: Record<string, TimerState>;
  completedStepIds: string[];
  missingIngredientIds?: string[];
  orientationLocked?: boolean;
  sessionClock?: SessionClockState;
  startedAt: number;
  updatedAt: number;
};

export type RecentRecipe = {
  recipe: MiseRecipe;
  lastUsedAt: number;
};

export type ImportResult =
  | { ok: true; recipe: MiseRecipe; warnings: string[] }
  | { ok: false; errors: string[] };
