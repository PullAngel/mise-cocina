package com.mise.cocina;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class MainActivity extends BridgeActivity {
    private static final int MAX_RECIPE_BYTES = 1_000_000;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(MiseImportPlugin.class);
        registerPlugin(MiseOrientationPlugin.class);
        registerPlugin(MiseAlertsPlugin.class);
        registerPlugin(MiseDeviceStatusPlugin.class);
        registerPlugin(MiseFileExportPlugin.class);
        registerPlugin(MiseSpeechPlugin.class);
        super.onCreate(savedInstanceState);
        acceptRecipeIntent(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        acceptRecipeIntent(intent);
    }

    private void acceptRecipeIntent(Intent intent) {
        if (intent == null) return;
        String text = null;
        if (Intent.ACTION_SEND.equals(intent.getAction())) {
            text = intent.getStringExtra(Intent.EXTRA_TEXT);
            if (text == null) text = readUri(intent.getParcelableExtra(Intent.EXTRA_STREAM));
        } else if (Intent.ACTION_VIEW.equals(intent.getAction())) {
            text = readUri(intent.getData());
        }
        if (text != null && !text.trim().isEmpty()) MiseImportPlugin.deliver(text);
    }

    private String readUri(Uri uri) {
        if (uri == null) return null;
        try (InputStream input = getContentResolver().openInputStream(uri);
             ByteArrayOutputStream output = new ByteArrayOutputStream()) {
            if (input == null) return null;
            byte[] buffer = new byte[8192];
            int total = 0;
            int count;
            while ((count = input.read(buffer)) != -1) {
                total += count;
                if (total > MAX_RECIPE_BYTES) return null;
                output.write(buffer, 0, count);
            }
            return output.toString(StandardCharsets.UTF_8.name());
        } catch (Exception ignored) {
            return null;
        }
    }
}
