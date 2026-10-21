import { describe, expect, it } from "vitest";
import { scaledQuantity } from "./ingredients";
import type { Ingredient } from "../types";

const ingredient = (patch: Partial<Ingredient>): Ingredient => ({
  id: "item", name: "Ingrediente", amount: { value: 2, unit: "cda" }, ...patch
});

describe("ingredient scaling", () => {
  it("scales ordinary quantities with servings", () => {
    expect(scaledQuantity(ingredient({}), 2, 3).amount).toBe("3 cda");
  });

  it("rounds batch ingredients up by original batch", () => {
    expect(scaledQuantity(ingredient({ scaling: "batch", amount: { value: 1, unit: "cda" } }), 2, 3).amount).toBe("2 cda");
  });

  it("does not invent numbers for taste-based ingredients", () => {
    expect(scaledQuantity(ingredient({ scaling: "to-taste", amount: { text: "unas gotas" } }), 2, 8).amount).toBe("unas gotas");
  });
});
