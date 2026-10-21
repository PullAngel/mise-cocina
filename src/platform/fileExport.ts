import { Capacitor, registerPlugin } from "@capacitor/core";

type FileExportPlugin = { share(options: { filename: string; content: string; mimeType: string; title: string }): Promise<void> };
const NativeFileExport = registerPlugin<FileExportPlugin>("MiseFileExport");

function browserDownload(filename: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export async function exportTextFile(filename: string, content: string, mimeType = "text/plain;charset=utf-8", title = "Guardar archivo Mise"): Promise<"shared" | "downloaded"> {
  if (Capacitor.isNativePlatform()) {
    await NativeFileExport.share({ filename, content, mimeType, title });
    return "shared";
  }
  const file = new File([content], filename, { type: mimeType });
  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({ files: [file], title });
    return "shared";
  }
  browserDownload(filename, content, mimeType);
  return "downloaded";
}
