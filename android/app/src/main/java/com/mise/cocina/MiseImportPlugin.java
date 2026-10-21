package com.mise.cocina;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "MiseImport")
public class MiseImportPlugin extends Plugin {
    private static String pendingRecipe;
    private static MiseImportPlugin instance;

    @Override
    public void load() {
        instance = this;
    }

    static synchronized void deliver(String text) {
        pendingRecipe = text;
        if (instance != null) {
            JSObject data = new JSObject();
            data.put("text", text);
            instance.notifyListeners("recipeReceived", data, true);
        }
    }

    @PluginMethod
    public synchronized void getPendingRecipe(PluginCall call) {
        JSObject result = new JSObject();
        if (pendingRecipe != null) result.put("text", pendingRecipe);
        pendingRecipe = null;
        call.resolve(result);
    }
}
