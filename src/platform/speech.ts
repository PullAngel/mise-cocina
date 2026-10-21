import { Capacitor, registerPlugin, type PluginListenerHandle } from "@capacitor/core";

type SpeechPlugin = {
  speak(options: { text: string; locale: string; id: string }): Promise<void>;
  stop(): Promise<void>;
  addListener(event: "ended", callback: (event: { id: string }) => void): Promise<PluginListenerHandle>;
};

const NativeSpeech = registerPlugin<SpeechPlugin>("MiseSpeech");
let webEnd: ((id: string) => void) | undefined;

export async function speak(text: string, locale = "es-AR", id = "mise-speech"): Promise<boolean> {
  if (Capacitor.isNativePlatform()) {
    try { await NativeSpeech.speak({ text, locale, id }); return true; } catch { return false; }
  }
  if (!("speechSynthesis" in window)) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = locale;
  utterance.rate = 0.92;
  const voices = window.speechSynthesis.getVoices().filter(voice => voice.lang.toLowerCase().startsWith("es"));
  const local = voices.find(voice => voice.localService) ?? voices[0];
  if (local) utterance.voice = local;
  utterance.onend = () => webEnd?.(id);
  utterance.onerror = () => webEnd?.(id);
  window.speechSynthesis.speak(utterance);
  return true;
}

export async function stopSpeaking(): Promise<void> {
  if (Capacitor.isNativePlatform()) await NativeSpeech.stop().catch(() => undefined);
  else window.speechSynthesis?.cancel();
}

export async function listenForSpeechEnd(callback: (id: string) => void): Promise<() => Promise<void>> {
  if (Capacitor.isNativePlatform()) {
    const listener = await NativeSpeech.addListener("ended", event => callback(event.id));
    return () => listener.remove();
  }
  webEnd = callback;
  return async () => { if (webEnd === callback) webEnd = undefined; };
}
