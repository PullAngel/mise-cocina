package com.mise.cocina;

import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

@CapacitorPlugin(name = "MiseDeviceStatus")
public class MiseDeviceStatusPlugin extends Plugin {
    @PluginMethod
    public void getStatus(PluginCall call) {
        Intent battery = getContext().registerReceiver(
            null,
            new IntentFilter(Intent.ACTION_BATTERY_CHANGED)
        );

        Integer batteryLevel = null;
        Boolean charging = null;

        if (battery != null) {
            int level = battery.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
            int scale = battery.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
            if (level >= 0 && scale > 0) {
                batteryLevel = Math.max(0, Math.min(100, Math.round(level * 100f / scale)));
            }

            int status = battery.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
            if (status != -1 && status != BatteryManager.BATTERY_STATUS_UNKNOWN) {
                charging = status == BatteryManager.BATTERY_STATUS_CHARGING
                    || status == BatteryManager.BATTERY_STATUS_FULL;
            }
        }

        long observedAt = System.currentTimeMillis();
        JSObject result = new JSObject();
        if (batteryLevel != null) result.put("batteryLevel", batteryLevel);
        if (charging != null) result.put("charging", charging);
        result.put("localTime", new SimpleDateFormat("HH:mm", Locale.getDefault()).format(new Date(observedAt)));
        result.put("observedAt", observedAt);
        call.resolve(result);
    }
}
