import elmPlugin from "vite-plugin-elm";

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    plugins: [elmPlugin()],
  },
  modules: ["@pinia/nuxt"],
});
