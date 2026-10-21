import { Capacitor, registerPlugin, type PluginListenerHandle } from "@capacitor/core";

type PendingRecipe = { text?: string };
type MiseImportPlugin = {
  getPendingRecipe(): Promise<PendingRecipe>;
  addListener(eventName: "recipeReceived", listener: (event: PendingRecipe) => void): Promise<PluginListenerHandle>;
};

const nativeImport = registerPlugin<MiseImportPlugin>("MiseImport");

export async function listenForNativeRecipes(onText: (text: string) => void): Promise<() => Promise<void>> {
  if (!Capacitor.isNativePlatform()) return async () => undefined;
  const pending = await nativeImport.getPendingRecipe();
  if (pending.text) onText(pending.text);
  const handle = await nativeImport.addListener("recipeReceived", event => {
    if (event.text) onText(event.text);
  });
  return () => handle.remove();
}
