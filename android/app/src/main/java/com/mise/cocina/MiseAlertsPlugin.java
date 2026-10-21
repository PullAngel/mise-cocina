package com.mise.cocina;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.media.AudioAttributes;
import android.net.Uri;
import android.provider.Settings;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "MiseAlerts")
public class MiseAlertsPlugin extends Plugin {
    public static final String CHANNEL_ID = "mise-timers-v2";

    @PluginMethod
    public void configureChannel(PluginCall call) {
        NotificationManager manager = (NotificationManager) getContext().getSystemService(Context.NOTIFICATION_SERVICE);
        boolean access = manager.isNotificationPolicyAccessGranted();
        NotificationChannel channel = manager.getNotificationChannel(CHANNEL_ID);
        if (channel == null) {
            channel = new NotificationChannel(CHANNEL_ID, "Cronómetros de cocina", NotificationManager.IMPORTANCE_HIGH);
            channel.setDescription("Alarmas activadas durante una receta");
            channel.enableVibration(true);
            AudioAttributes attributes = new AudioAttributes.Builder()
                .setUsage(AudioAttributes.USAGE_ALARM)
                .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                .build();
            Uri sound = Settings.System.DEFAULT_ALARM_ALERT_URI;
            channel.setSound(sound, attributes);
        }
        if (access) channel.setBypassDnd(true);
        manager.createNotificationChannel(channel);
        JSObject result = new JSObject();
        result.put("policyAccess", access);
        call.resolve(result);
    }

    @PluginMethod
    public void requestPolicyAccess(PluginCall call) {
        Intent intent = new Intent(Settings.ACTION_NOTIFICATION_POLICY_ACCESS_SETTINGS);
        getActivity().startActivity(intent);
        call.resolve();
    }
}
