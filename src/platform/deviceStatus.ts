import { Capacitor, registerPlugin } from "@capacitor/core";

export type DeviceStatus = {
  /** Battery percentage from 0 through 100, or null when the platform cannot report it. */
  batteryLevel: number | null;
  charging: boolean | null;
  /** Local 24-hour time suitable for the compact header. */
  localTime: string;
  /** Unix timestamp in milliseconds for freshness checks. */
  observedAt: number;
};

type NativeDeviceStatus = Partial<Omit<DeviceStatus, "batteryLevel" | "charging">> & {
  batteryLevel?: number;
  charging?: boolean;
};

type MiseDeviceStatusPlugin = {
  getStatus(): Promise<NativeDeviceStatus>;
};

type BrowserBattery = {
  level: number;
  charging: boolean;
};

type NavigatorWithBattery = Navigator & {
  getBattery?: () => Promise<BrowserBattery>;
};

const nativeDeviceStatus = registerPlugin<MiseDeviceStatusPlugin>("MiseDeviceStatus");

function localTime(date: Date): string {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function normalizeBatteryLevel(level: unknown): number | null {
  if (typeof level !== "number" || !Number.isFinite(level)) return null;
  return Math.round(Math.max(0, Math.min(100, level)));
}

export async function getDeviceStatus(): Promise<DeviceStatus> {
  const now = new Date();
  const fallback: DeviceStatus = {
    batteryLevel: null,
    charging: null,
    localTime: localTime(now),
    observedAt: now.getTime(),
  };

  if (Capacitor.isNativePlatform()) {
    try {
      const status = await nativeDeviceStatus.getStatus();
      return {
        batteryLevel: normalizeBatteryLevel(status.batteryLevel),
        charging: typeof status.charging === "boolean" ? status.charging : null,
        localTime: typeof status.localTime === "string" ? status.localTime : fallback.localTime,
        observedAt: typeof status.observedAt === "number" ? status.observedAt : fallback.observedAt,
      };
    } catch {
      return fallback;
    }
  }

  try {
    const battery = await (navigator as NavigatorWithBattery).getBattery?.();
    if (!battery) return fallback;
    return {
      ...fallback,
      batteryLevel: normalizeBatteryLevel(battery.level * 100),
      charging: battery.charging,
    };
  } catch {
    return fallback;
  }
}
