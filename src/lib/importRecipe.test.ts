import { describe, expect, it } from "vitest";
import demo from "../../examples/pollo-ostras.mise.json";
import tamarindChicken from "../../recipes/pollo-crocante-tamarindo-batata-v2.mise.json";
import { parseRecipeInput } from "./importRecipe";

describe("recipe handoff", () => {
  it("accepts the example in a marked ChatGPT block", () => {
    const result = parseRecipeInput(`---MISE/1---\n${JSON.stringify(demo)}\n---END-MISE---`);
    expect(result.ok).toBe(true);
  });

  it("keeps accepting a 1.0 recipe without visual metadata", () => {
    const legacy = structuredClone(demo) as Record<string, any>;
    legacy.version = "1.0";
    legacy.ingredients.forEach((ingredient: Record<string, unknown>) => delete ingredient.kind);
    legacy.steps.forEach((step: Record<string, unknown>) => delete step.shortLabel);
    expect(parseRecipeInput(JSON.stringify(legacy)).ok).toBe(true);
  });

  it("accepts the tamarind chicken recipe exported from ChatGPT", () => {
    const result = parseRecipeInput(JSON.stringify(tamarindChicken));
    expect(result.ok).toBe(true);
  });

  it("rejects references to ingredients that do not exist", () => {
    const broken = structuredClone(demo);
    broken.steps[0].amounts[0].ingredientId = "missing";
    const result = parseRecipeInput(JSON.stringify(broken));
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.join(" ")).toContain("ingrediente inexistente");
  });

  it("accepts JSON wrapped in a code fence inside the delimiters", () => {
    const result = parseRecipeInput("---MISE/1---\n```json\n" + JSON.stringify(demo) + "\n```\n---END-MISE---");
    expect(result.ok).toBe(true);
  });

  it("names the offending property so it can be pasted back to the assistant", () => {
    const extra = structuredClone(demo) as Record<string, any>;
    extra.finish.tip = "x";
    const result = parseRecipeInput(JSON.stringify(extra));
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.join(" ")).toContain("«tip»");
  });

  it("rejects servings given as a plain number with a readable location", () => {
    const wrong = structuredClone(demo) as Record<string, any>;
    wrong.servings = 2;
    const result = parseRecipeInput(JSON.stringify(wrong));
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.join(" ")).toContain("/servings");
  });

  it("warns, without blocking, when a step depends on a later step", () => {
    const swapped = structuredClone(demo) as Record<string, any>;
    swapped.steps[0].dependsOn = [swapped.steps[1].id];
    const result = parseRecipeInput(JSON.stringify(swapped));
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.warnings.join(" ")).toContain("depende de un paso que aparece después");
  });

  it("does not warn about order in the reference recipes", () => {
    [demo, tamarindChicken].forEach(recipe => {
      const result = parseRecipeInput(JSON.stringify(recipe));
      expect(result.ok && result.warnings.some(item => item.includes("revisá el orden"))).toBe(false);
    });
  });
});
