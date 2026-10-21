package com.mise.cocina;

import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.PluginMethod;
import java.util.Locale;

@CapacitorPlugin(name = "MiseSpeech")
public class MiseSpeechPlugin extends Plugin implements TextToSpeech.OnInitListener {
    private TextToSpeech engine;
    private boolean ready = false;

    @Override public void load() {
        engine = new TextToSpeech(getContext(), this);
        engine.setOnUtteranceProgressListener(new UtteranceProgressListener() {
            @Override public void onStart(String id) { }
            @Override public void onError(String id) { notifyEnd(id); }
            @Override public void onDone(String id) { notifyEnd(id); }
        });
    }

    @Override public void onInit(int status) {
        ready = status == TextToSpeech.SUCCESS;
        if (ready) { engine.setLanguage(new Locale("es", "AR")); engine.setSpeechRate(0.92f); }
    }

    private void notifyEnd(String id) {
        JSObject data = new JSObject();
        data.put("id", id);
        notifyListeners("ended", data);
    }

    @PluginMethod public void speak(PluginCall call) {
        if (!ready) { call.reject("La voz todavía no está disponible."); return; }
        String text = call.getString("text", "");
        String id = call.getString("id", "mise-speech");
        Locale locale = Locale.forLanguageTag(call.getString("locale", "es-AR"));
        if (engine.isLanguageAvailable(locale) >= TextToSpeech.LANG_AVAILABLE) engine.setLanguage(locale);
        int result = engine.speak(text, TextToSpeech.QUEUE_FLUSH, new Bundle(), id);
        if (result == TextToSpeech.ERROR) call.reject("No se pudo iniciar la lectura."); else call.resolve();
    }

    @PluginMethod public void stop(PluginCall call) {
        if (engine != null) engine.stop();
        call.resolve();
    }

    @Override protected void handleOnDestroy() {
        if (engine != null) engine.shutdown();
    }
}
