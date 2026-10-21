import type { MiseRecipe } from "../types";
import { argentineRecipes } from "./recipesArgentine";
import { dessertRecipes } from "./recipesDessert";
import { fusionRecipes } from "./recipesFusion";
import { latinRecipes } from "./recipesLatin";

export const preloadedRecipes: MiseRecipe[] = [
  ...argentineRecipes,
  ...latinRecipes,
  ...fusionRecipes,
  ...dessertRecipes
];
