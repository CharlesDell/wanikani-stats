import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    solidPlugin(),
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "WaniKani Stats",
        short_name: "WKStats",
        description: "Statistics for the WaniKani Web App",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/src/assets/icon_x48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "/src/assets/icon_x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/src/assets/icon_x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/src/assets/icon_x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "/src/assets/icon_x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/src/assets/icon_x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/src/assets/icon_x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/src/assets/icon.png",
            sizes: "1024x1024",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
