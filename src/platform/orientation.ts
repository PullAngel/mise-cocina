import { Capacitor, registerPlugin } from "@capacitor/core";

type OrientationPlugin = { setLocked(options: { locked: boolean }): Promise<void> };
const nativeOrientation = registerPlugin<OrientationPlugin>("MiseOrientation");

export function currentOrientation(): "portrait" | "landscape" {
  return window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape";
}

export async function setOrientationLocked(locked: boolean): Promise<void> {
  try {
    if (Capacitor.isNativePlatform()) {
      await nativeOrientation.setLocked({ locked });
      return;
    }
    const orientation = screen.orientation as ScreenOrientation & {
      lock?: (mode: "portrait" | "landscape") => Promise<void>;
      unlock?: () => void;
    };
    if (locked) await orientation.lock?.(currentOrientation());
    else orientation.unlock?.();
  } catch {
    // The visual state still explains the preference when a browser declines it.
  }
}
