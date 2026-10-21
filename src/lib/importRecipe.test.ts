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
});
