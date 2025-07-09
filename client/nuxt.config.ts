// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';
// import * from 'assets/css/main.css'

export default defineNuxtConfig({
  // ssr: true,
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  app: {
    head: {
      titleTemplate: '%s - Laravel Socialite',
    },
  },
  runtimeConfig: {},
  css: ['~/assets/css/main.css'],
  vite: {
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
    plugins: [tailwindcss()],
  },
  modules: ['shadcn-nuxt', 'nuxt-auth-sanctum'],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },
  sanctum: {
    mode: 'cookie',
    baseUrl: 'http://localhost:8080',
    redirect: {
      onLogin: '/dashboard',
      onLogout: '/',
      onAuthOnly: '/',
      onGuestOnly: '/dashboard',
    },
    // endpoints: {
      // csrf: '/sanctum/csrf-cookie',
      // login: '/login',
      // logout: '/logout',
      // user: '/api/user',
    // },
    csrf: {
      cookie: 'XSRF-TOKEN',
      header: 'X-XSRF-TOKEN',
    },
    client: {
      retry: false,
      initialRequest: true,
    },
  },
  imports: {
    autoImport: true,
  },
});