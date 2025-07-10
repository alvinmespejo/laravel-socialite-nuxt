import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      appApiUrl: process.env.NUXT_PUBLIC_APP_API_URL,
      appBaseUrl: process.env.NUXT_PUBLIC_APP_BASE_URL,
      // sanctum: {
      //   baseUrl: process.env.NUXT_PUBLIC_APP_API_URL,
      // },
    },
  },
  app: {
    head: {
      titleTemplate: '%s - Laravel Socialite',
    },
  },
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
  modules: ['shadcn-nuxt', 'nuxt-auth-sanctum', '@nuxt/icon'],
  sanctum: {
    // mode: 'cookie',
    baseUrl: process.env.NUXT_PUBLIC_APP_API_URL,
    redirect: {
      onLogin: '/dashboard',
      onLogout: '/',
      onAuthOnly: '/',
      onGuestOnly: '/dashboard',
    },
    endpoints: {
      csrf: '/sanctum/csrf-cookie',
      login: '/login',
      logout: '/logout',
      user: '/api/user',
    },
    csrf: {
      cookie: 'XSRF-TOKEN',
      header: 'X-XSRF-TOKEN',
    },
    client: {
      retry: false,
      initialRequest: true,
    },
  },
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
  icon: {
    customCollections: [{
      prefix: 'icons',
      dir: './assets/icons/customs'
    }],
    serverBundle: {
      collections: ['util', 'mdi'],
    }
  }
});