import type { TimerState } from "../types";

export function createTimer(stepId: string, durationSeconds: number, notificationId: number): TimerState {
  return { stepId, durationMs: durationSeconds * 1000, pausedRemainingMs: durationSeconds * 1000, notificationId };
}

export function startTimer(timer: TimerState, now = Date.now()): TimerState {
  // A finished (or emptied) timer restarts from its full duration.
  const leftover = timer.finishedAt ? 0 : timer.pausedRemainingMs ?? timer.durationMs;
  const remaining = leftover > 0 ? leftover : timer.durationMs;
  return { ...timer, dueAt: now + remaining, pausedRemainingMs: undefined, finishedAt: undefined };
}

export function pauseTimer(timer: TimerState, now = Date.now()): TimerState {
  if (!timer.dueAt) return timer;
  return { ...timer, dueAt: undefined, pausedRemainingMs: Math.max(0, timer.dueAt - now) };
}

export function addTime(timer: TimerState, milliseconds: number): TimerState {
  if (timer.dueAt) return { ...timer, dueAt: timer.dueAt + milliseconds };
  const base = timer.finishedAt ? 0 : timer.pausedRemainingMs ?? timer.durationMs;
  return { ...timer, finishedAt: undefined, pausedRemainingMs: Math.max(0, base + milliseconds) };
}

export function remainingMs(timer: TimerState, now = Date.now()): number {
  if (timer.dueAt) return Math.max(0, timer.dueAt - now);
  if (timer.finishedAt) return 0;
  return Math.max(0, timer.pausedRemainingMs ?? timer.durationMs);
}

export function isRunning(timer: TimerState): boolean {
  return Boolean(timer.dueAt);
}

/** Running timer whose deadline has already passed. */
export function hasExpired(timer: TimerState, now = Date.now()): boolean {
  return Boolean(timer.dueAt) && (timer.dueAt as number) <= now;
}

export function isFinished(timer: TimerState, now = Date.now()): boolean {
  return Boolean(timer.finishedAt) || hasExpired(timer, now);
}

/** Moves an expired running timer to the finished state. Returns the same object if nothing changed. */
export function settleTimer(timer: TimerState, now = Date.now()): TimerState {
  if (!hasExpired(timer, now)) return timer;
  return { ...timer, dueAt: undefined, pausedRemainingMs: 0, finishedAt: timer.dueAt };
}

/** Back to the untouched state: full duration, paused, off the ribbon. */
export function resetTimer(timer: TimerState): TimerState {
  return { stepId: timer.stepId, notificationId: timer.notificationId, durationMs: timer.durationMs, pausedRemainingMs: timer.durationMs };
}

export type TimerGroup = "finished" | "running" | "paused";

export function timerGroup(timer: TimerState, now = Date.now()): TimerGroup {
  if (isFinished(timer, now)) return "finished";
  return timer.dueAt ? "running" : "paused";
}

/** Ribbon order: finished first (they need attention), then running by soonest deadline, then paused. */
export function compareTimers(a: TimerState, b: TimerState, now = Date.now()): number {
  const order: Record<TimerGroup, number> = { finished: 0, running: 1, paused: 2 };
  const ga = timerGroup(a, now);
  const gb = timerGroup(b, now);
  if (ga !== gb) return order[ga] - order[gb];
  if (ga === "finished") return (b.finishedAt ?? b.dueAt ?? 0) - (a.finishedAt ?? a.dueAt ?? 0);
  if (ga === "running") return (a.dueAt ?? 0) - (b.dueAt ?? 0);
  return 0;
}

export function formatDuration(milliseconds: number): string {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}
