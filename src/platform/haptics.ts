import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

export async function selectionHaptic(): Promise<void> {
  try {
    if (Capacitor.isNativePlatform()) {
      await Haptics.impact({ style: ImpactStyle.Light });
    } else {
      navigator.vibrate?.(9);
    }
  } catch {
    // Haptics are an enhancement; navigation must never depend on them.
  }
}
