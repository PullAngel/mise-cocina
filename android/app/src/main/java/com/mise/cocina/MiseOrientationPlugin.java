package com.mise.cocina;

import android.content.pm.ActivityInfo;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "MiseOrientation")
public class MiseOrientationPlugin extends Plugin {
    @PluginMethod
    public void setLocked(PluginCall call) {
        boolean locked = call.getBoolean("locked", false);
        getActivity().runOnUiThread(() -> {
            getActivity().setRequestedOrientation(
                locked ? ActivityInfo.SCREEN_ORIENTATION_LOCKED : ActivityInfo.SCREEN_ORIENTATION_FULL_SENSOR
            );
            call.resolve();
        });
    }
}
