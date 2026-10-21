import { Capacitor } from "@capacitor/core";
import { StatusBar } from "@capacitor/status-bar";

let wakeLock: WakeLockSentinel | undefined;

export async function keepScreenAwake(): Promise<void> {
  try {
    if ("wakeLock" in navigator && !wakeLock) {
      wakeLock = await navigator.wakeLock.request("screen");
      wakeLock.addEventListener("release", () => { wakeLock = undefined; });
    }
  } catch {
    // The session and timers remain usable when the platform refuses a wake lock.
  }
}

export async function enterKitchenDisplay(): Promise<void> {
  await keepScreenAwake();
  try {
    if (Capacitor.isNativePlatform()) await StatusBar.hide();
    else if (document.documentElement.requestFullscreen && !document.fullscreenElement) await document.documentElement.requestFullscreen();
  } catch {
    // Full screen is a convenience and may be blocked outside a direct user gesture.
  }
}

export async function leaveKitchenDisplay(): Promise<void> {
  try {
    await wakeLock?.release();
    wakeLock = undefined;
    if (Capacitor.isNativePlatform()) await StatusBar.show();
    else if (document.fullscreenElement) await document.exitFullscreen();
  } catch {
    // Nothing else depends on display mode.
  }
}
