import type { Ingredient, Quantity } from "../types";

function rounded(value: number): number {
  if (Math.abs(value) >= 100) return Math.round(value);
  return Math.round(value * 100) / 100;
}

function displayNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(rounded(value));
}

export function scaledQuantity(
  ingredient: Ingredient,
  originalServings: number,
  requestedServings: number,
  locale = "es-AR"
): { amount: string; note?: string } {
  const policy = ingredient.scaling ?? "linear";
  const quantity: Quantity = ingredient.amount;
  if (policy === "to-taste" || quantity.text) {
    return { amount: quantity.text ?? "a gusto", note: ingredient.scalingNote };
  }

  let factor = requestedServings / originalServings;
  if (policy === "fixed") factor = 1;
  if (policy === "batch") factor = Math.max(1, Math.ceil(requestedServings / originalServings));

  const unit = quantity.unit ? ` ${quantity.unit}` : "";
  let amount = "—";
  if (typeof quantity.value === "number") amount = `${displayNumber(quantity.value * factor, locale)}${unit}`;
  if (typeof quantity.min === "number" && typeof quantity.max === "number") {
    amount = `${displayNumber(quantity.min * factor, locale)}–${displayNumber(quantity.max * factor, locale)}${unit}`;
  }
  return { amount, note: ingredient.scalingNote };
}
