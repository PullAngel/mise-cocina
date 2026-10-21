import type { TimerState } from "../types";

export function createTimer(stepId: string, durationSeconds: number, notificationId: number): TimerState {
  return { stepId, durationMs: durationSeconds * 1000, pausedRemainingMs: durationSeconds * 1000, notificationId };
}

export function startTimer(timer: TimerState, now = Date.now()): TimerState {
  const remaining = timer.pausedRemainingMs ?? timer.durationMs;
  return { ...timer, dueAt: now + remaining, pausedRemainingMs: undefined };
}

export function pauseTimer(timer: TimerState, now = Date.now()): TimerState {
  if (!timer.dueAt) return timer;
  return { ...timer, dueAt: undefined, pausedRemainingMs: Math.max(0, timer.dueAt - now) };
}

export function addTime(timer: TimerState, milliseconds: number): TimerState {
  if (timer.dueAt) return { ...timer, dueAt: timer.dueAt + milliseconds };
  return { ...timer, pausedRemainingMs: Math.max(0, (timer.pausedRemainingMs ?? timer.durationMs) + milliseconds) };
}

export function remainingMs(timer: TimerState, now = Date.now()): number {
  if (timer.dueAt) return Math.max(0, timer.dueAt - now);
  return Math.max(0, timer.pausedRemainingMs ?? timer.durationMs);
}

export function isRunning(timer: TimerState): boolean {
  return Boolean(timer.dueAt);
}

export function formatDuration(milliseconds: number): string {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}
