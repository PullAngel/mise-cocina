import { describe, expect, it } from "vitest";
import { addTime, createTimer, pauseTimer, remainingMs, startTimer } from "./timer";

describe("persistent timers", () => {
  it("uses an absolute deadline across app suspension", () => {
    const timer = startTimer(createTimer("sear", 120, 1), 1_000);
    expect(timer.dueAt).toBe(121_000);
    expect(remainingMs(timer, 61_000)).toBe(60_000);
  });

  it("pauses and extends without losing elapsed time", () => {
    const running = startTimer(createTimer("rice", 300, 2), 10_000);
    const paused = pauseTimer(running, 70_000);
    expect(remainingMs(paused, 900_000)).toBe(240_000);
    expect(remainingMs(addTime(paused, 30_000))).toBe(270_000);
  });
});
