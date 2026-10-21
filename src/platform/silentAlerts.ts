import { Capacitor, registerPlugin } from "@capacitor/core";

type AlertPolicyPlugin = {
  configureChannel(): Promise<{ policyAccess: boolean }>;
  requestPolicyAccess(): Promise<void>;
};

const nativeAlerts = registerPlugin<AlertPolicyPlugin>("MiseAlerts");

export async function configureSilentAlarmChannel(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return false;
  try { return (await nativeAlerts.configureChannel()).policyAccess; } catch { return false; }
}

export async function requestSilentAlarmAccess(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try { await nativeAlerts.requestPolicyAccess(); } catch { /* Settings may be unavailable. */ }
}
