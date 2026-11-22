import { describe, expect, it } from "vitest";
import canonical from "../../prompts/instrucciones-chatgpt-mise.txt?raw";
import { buildAdapterPrompt, buildChefPrompt, buildDeliveryPrompt, describeChef, experienceOptions, initiativeOptions, priorityOptions } from "./handoffKit";

const everyCombination = experienceOptions.flatMap(experience => priorityOptions.flatMap(priority => initiativeOptions.map(guidance => ({ experience: experience.value, priority: priority.value, initiative: guidance.value }))));

describe("prompt kit", () => {
  it("keeps the canonical instructions file identical to the adapter prompt", () => {
    expect(canonical.trim()).toBe(buildAdapterPrompt());
  });

  it("builds all 36 chefs with the exact JSON shape and the one-timer-per-step rule", () => {
    expect(everyCombination).toHaveLength(36);
    everyCombination.forEach(answers => {
      const prompt = buildChefPrompt(answers);
      expect(prompt).toContain('"servings":{"count":2');
      expect(prompt).toContain("Cada paso admite un solo timer");
      expect(prompt).toContain("Nivel de detalle");
      expect(prompt).toContain("EXPERIENCIA EN COCINA:");
      expect(prompt).toContain("CUÁNTO GUIAR:");
    });
  });

  it("adds the block that matches each answer", () => {
    const prompt = buildChefPrompt({ experience: "principiante", priority: "calm", initiative: "guiame" });
    expect(prompt).toContain("QUÉ PRIORIZAR: CALMA");
    expect(prompt).toContain("EXPERIENCIA EN COCINA: PRINCIPIANTE");
    expect(prompt).toContain("CUÁNTO GUIAR: MUCHO");
    expect(prompt).not.toContain("EXPERIENCIA EN COCINA: AVANZADA");
  });

  it("describes the chef in one sentence and gives each combination its own file name", () => {
    const chef = describeChef({ experience: "avanzado", priority: "technical", initiative: "solo cuando haga falta" });
    expect(chef.name).toBe("Técnico");
    expect(chef.summary).toBe("Te enseña el porqué de cada paso, va al grano, sin lo obvio y habla solo cuando hace falta.");
    expect(new Set(everyCombination.map(answers => describeChef(answers).filename)).size).toBe(36);
  });

  it("builds a self-contained delivery request for long chats", () => {
    const prompt = buildDeliveryPrompt();
    expect(prompt.startsWith("Pasala a Mise.")).toBe(true);
    expect(prompt).toContain("---MISE/1---");
  });
});
