// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  vite:{
    server: {
      hmr: {
        // host: '0.0.0.0',
        port: 24678,
      },
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
  }
});
