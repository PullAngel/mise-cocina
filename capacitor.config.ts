import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.mise.cocina",
  appName: "Mise Cocina",
  webDir: "dist",
  backgroundColor: "#151715",
  android: { allowMixedContent: false },
  plugins: {
    LocalNotifications: { smallIcon: "ic_stat_mise", iconColor: "#ff6534" },
    StatusBar: { overlaysWebView: false, backgroundColor: "#151715", style: "LIGHT" }
  }
};

export default config;
