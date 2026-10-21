import { describe, expect, it } from "vitest";
import { parseRecipeInput } from "../lib/importRecipe";
import { preloadedRecipes } from "./preloadedRecipes";

describe("recetas precargadas", () => {
  it("mantiene doce recetas válidas y con roles visuales", () => {
    expect(preloadedRecipes).toHaveLength(12);
    preloadedRecipes.forEach(recipe => {
      const result = parseRecipeInput(JSON.stringify(recipe));
      expect(result.ok, recipe.title).toBe(true);
      expect(recipe.components.every(component => component.role)).toBe(true);
    });
  });
});
