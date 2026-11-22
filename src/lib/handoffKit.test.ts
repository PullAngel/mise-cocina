import { describe, expect, it } from "vitest";
import canonical from "../../prompts/instrucciones-chatgpt-mise.txt?raw";
import { buildAdapterPrompt, buildChefPrompt, buildDeliveryPrompt, recommendProfile, type ChefProfile } from "./handoffKit";

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

  it("writes the chef answers as full sentences", () => {
    const prompt = buildChefPrompt("calm", { experience: "principiante", priority: "calm", initiative: "guiame" });
    expect(prompt).toContain("Experiencia en cocina: principiante; explicá lo básico.");
    expect(prompt).toContain("Cuánto guiar: guiame paso a paso sin que yo tenga que preguntar.");
  });

  it("suggests the calm profile for beginners who want guidance", () => {
    expect(recommendProfile({ experience: "principiante", priority: "practical", initiative: "guiame" })).toBe("calm");
    expect(recommendProfile({ experience: "avanzado", priority: "technical", initiative: "guiame" })).toBe("technical");
  });
});
