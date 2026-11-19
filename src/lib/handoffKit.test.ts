import { describe, expect, it } from "vitest";
import canonical from "../../prompts/instrucciones-chatgpt-mise.txt?raw";
import { buildAdapterPrompt, buildChefPrompt, buildDeliveryPrompt, type ChefProfile } from "./handoffKit";

describe("prompt kit", () => {
  it("keeps the canonical instructions file identical to the adapter prompt", () => {
    expect(canonical.trim()).toBe(buildAdapterPrompt());
  });

  it("includes the exact JSON shape and the one-timer-per-step rule in every chef prompt", () => {
    (["practical", "explorer", "technical", "calm"] as ChefProfile[]).forEach(profile => {
      const prompt = buildChefPrompt(profile, { experience: "intermedio", priority: profile, initiative: "equilibrada" });
      expect(prompt).toContain('"servings":{"count":2');
      expect(prompt).toContain("Cada paso admite un solo timer");
      expect(prompt).toContain("Nivel de detalle");
    });
  });

  it("builds a self-contained delivery request for long chats", () => {
    const prompt = buildDeliveryPrompt();
    expect(prompt.startsWith("Pasala a Mise.")).toBe(true);
    expect(prompt).toContain("---MISE/1---");
  });
});
