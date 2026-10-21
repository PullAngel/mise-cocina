package com.mise.cocina;

import android.content.Intent;
import android.net.Uri;
import androidx.core.content.FileProvider;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.PluginMethod;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;

@CapacitorPlugin(name = "MiseFileExport")
public class MiseFileExportPlugin extends Plugin {
    @PluginMethod
    public void share(PluginCall call) {
        String filename = call.getString("filename", "mise.txt").replaceAll("[^a-zA-Z0-9._-]", "-");
        String content = call.getString("content", "");
        String mimeType = call.getString("mimeType", "text/plain");
        String title = call.getString("title", "Guardar archivo Mise");
        if (content.getBytes(StandardCharsets.UTF_8).length > 1_000_000) {
            call.reject("El archivo supera el límite de 1 MB.");
            return;
        }
        try {
            File directory = new File(getContext().getCacheDir(), "mise-exports");
            if (!directory.exists() && !directory.mkdirs()) throw new IllegalStateException("No se pudo preparar la carpeta temporal.");
            File output = new File(directory, filename);
            try (FileOutputStream stream = new FileOutputStream(output)) {
                stream.write(content.getBytes(StandardCharsets.UTF_8));
            }
            Uri uri = FileProvider.getUriForFile(getContext(), getContext().getPackageName() + ".fileprovider", output);
            Intent intent = new Intent(Intent.ACTION_SEND);
            intent.setType(mimeType);
            intent.putExtra(Intent.EXTRA_STREAM, uri);
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            getActivity().startActivity(Intent.createChooser(intent, title));
            call.resolve(new JSObject());
        } catch (Exception error) {
            call.reject("No se pudo compartir el archivo.", error);
        }
    }
}
