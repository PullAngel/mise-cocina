import { describe, expect, it } from "vitest";
import { addTime, compareTimers, createTimer, hasExpired, isFinished, isRunning, pauseTimer, remainingMs, resetTimer, settleTimer, startTimer, timerGroup } from "./timer";

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

describe("finished timers", () => {
  const running = startTimer(createTimer("rice", 60, 2), 0);

  it("only expires once the deadline has passed", () => {
    expect(hasExpired(running, 59_999)).toBe(false);
    expect(hasExpired(running, 60_000)).toBe(true);
    expect(settleTimer(running, 59_999)).toBe(running);
  });

  it("settles into a finished state without a deadline to reschedule", () => {
    const settled = settleTimer(running, 500_000);
    expect(settled.dueAt).toBeUndefined();
    expect(isRunning(settled)).toBe(false);
    expect(isFinished(settled)).toBe(true);
    expect(settled.finishedAt).toBe(60_000);
    expect(remainingMs(settled, 500_000)).toBe(0);
    expect(settleTimer(settled, 600_000)).toBe(settled);
  });

  it("restarts a finished timer from its full duration", () => {
    const again = startTimer(settleTimer(running, 500_000), 1_000_000);
    expect(again.dueAt).toBe(1_060_000);
    expect(again.finishedAt).toBeUndefined();
  });

  it("adds time to a finished timer from zero and reopens it", () => {
    const extended = addTime(settleTimer(running, 500_000), 30_000);
    expect(remainingMs(extended)).toBe(30_000);
    expect(isFinished(extended)).toBe(false);
  });

  it("resets to the untouched state", () => {
    const reset = resetTimer(settleTimer(running, 500_000));
    expect(reset).toEqual(createTimer("rice", 60, 2));
  });
});

describe("timer ordering", () => {
  const make = (id: string, seconds: number) => createTimer(id, seconds, 1);
  it("puts finished first, then running by soonest deadline, then paused", () => {
    const now = 100_000;
    const late = startTimer(make("late", 600), 0);
    const soon = startTimer(make("soon", 130), 0);
    const done = startTimer(make("done", 10), 0);
    const paused = pauseTimer(startTimer(make("paused", 300), 0), 50_000);
    const sorted = [paused, late, done, soon].sort((a, b) => compareTimers(a, b, now));
    expect(sorted.map(t => t.stepId)).toEqual(["done", "soon", "late", "paused"]);
    expect(timerGroup(done, now)).toBe("finished");
  });
});
