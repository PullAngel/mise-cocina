import { Capacitor } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";
import type { PluginListenerHandle } from "@capacitor/core";
import type { TimerState } from "../types";

export type NotificationReadiness = "native-ready" | "permission-needed" | "exact-alarm-needed" | "web-only";
export type TimerNotificationAction = { action: "open" | "silence"; stepId?: string };
const TIMER_ACTION_TYPE = "MISE_TIMER";

export async function notificationReadiness(): Promise<NotificationReadiness> {
  if (!Capacitor.isNativePlatform()) return "web-only";
  const permission = await LocalNotifications.checkPermissions();
  if (permission.display !== "granted") return "permission-needed";
  const exact = await LocalNotifications.checkExactNotificationSetting();
  if (exact.exact_alarm !== "granted") return "exact-alarm-needed";
  return "native-ready";
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) {
    if (!("Notification" in window)) return false;
    return (await Notification.requestPermission()) === "granted";
  }
  const result = await LocalNotifications.requestPermissions();
  return result.display === "granted";
}

export async function openExactAlarmSettings(): Promise<void> {
  if (Capacitor.isNativePlatform()) await LocalNotifications.changeExactNotificationSetting();
}

export async function scheduleTimerNotification(timer: TimerState, title: string): Promise<void> {
  if (!Capacitor.isNativePlatform() || !timer.dueAt) return;
  try {
    await LocalNotifications.cancel({ notifications: [{ id: timer.notificationId }] });
    await LocalNotifications.schedule({
      notifications: [{
        id: timer.notificationId,
        title: "Mise · cronómetro listo",
        body: title,
        schedule: { at: new Date(timer.dueAt), allowWhileIdle: true },
        extra: { stepId: timer.stepId },
        actionTypeId: TIMER_ACTION_TYPE,
        channelId: "mise-timers-v2"
      }]
    });
  } catch {
    // The persistent deadline remains valid; the setup prompt stays visible.
  }
}

export async function cancelTimerNotification(notificationId: number): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try { await LocalNotifications.cancel({ notifications: [{ id: notificationId }] }); } catch { /* No pending alarm. */ }
}

export async function configureNotificationChannel(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    await LocalNotifications.registerActionTypes({ types: [{
      id: TIMER_ACTION_TYPE,
      actions: [
        { id: "SILENCE", title: "Silenciar" },
        { id: "OPEN_STEP", title: "Ver paso", foreground: true }
      ]
    }] });
    await LocalNotifications.createChannel({
      id: "mise-timers-v2",
      name: "Cronómetros de cocina",
      description: "Alarmas activadas por el usuario durante una receta",
      importance: 5,
      visibility: 1,
      vibration: true
    });
  } catch {
    // The system channel may already exist.
  }
}

export async function listenForTimerNotificationActions(
  listener: (action: TimerNotificationAction) => void
): Promise<PluginListenerHandle | undefined> {
  if (!Capacitor.isNativePlatform()) return undefined;
  return LocalNotifications.addListener("localNotificationActionPerformed", async event => {
    const stepId = typeof event.notification.extra?.stepId === "string" ? event.notification.extra.stepId : undefined;
    const silence = event.actionId === "SILENCE";
    try {
      await LocalNotifications.removeDeliveredNotificationsById({ ids: [event.notification.id] });
    } catch {
      // The notification may already have been dismissed by Android.
    }
    listener({ action: silence ? "silence" : "open", stepId });
  });
}
