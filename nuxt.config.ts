import UnpluginComponentsVite from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  // server side rendering mode
  ssr: true,

  // typescripts
  // typescript: {
  //   strict: true,
  //   typeCheck: true,
  // },

  // css
  css: [
    '~/assets/sass/vendor.scss',
    '~/assets/sass/app.scss',
    '~/assets/css/styles.css'
  ],

  // plugins
  plugins: ['~/plugins/navbar.ts'],

  // build
  build: {
    transpile: ['@headlessui/vue'],
  },

  // modules
  modules: [
    'unplugin-icons/nuxt',
    '@intlify/nuxt3',
    '@pinia/nuxt',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-windicss'
  ],

  imports: {
    dirs: ['./stores'],
  },

  // vite plugins
  vite: {
    plugins: [
      UnpluginComponentsVite({
        dts: true,
        resolvers: [
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
      }),
    ],
  },

  // app config
  app: {
  // global transition
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  // localization - i18n config
  intlify: {
    localeDir: 'locales',
    vueI18n: {
      locale: 'en',
      fallbackLocale: 'en',
      availableLocales: ['en', 'id', 'ja', 'ko'],
    },
  },

  // vueuse
  vueuse: {
    ssrHandlers: false,
  },

  // windicss
  windicss: {
    analyze: {
      analysis: {
        interpretUtilities: false,
      },
      server: {
        port: 4000,
        open: false,
      },
    },
    scan: true,
  },

  // content
  content: {
    documentDriven: true,
    markdown: {
      mdc: true,
    },
    highlight: {
      theme: 'github-dark',
    },
  },
  
  runtimeConfig: {
    public: {
      apiBase: '/api'
    },
    secretKey: process.env.SECRET_KEY,
    notionApiKey: process.env.NOTION_API_KEY,
    notionDB:{
      companies: process.env.NOTION_COMPANIES_DB,
      regions: process.env.NOTION_REGIONS_DB,
      cities: process.env.NOTION_CITIES_DB,
      malls: process.env.NOTION_MALLS_DB,
      users: process.env.NOTION_USERS_DB,
      bots: process.env.NOTION_BOTS_DB,
      art: process.env.NOTION_ART_DB
    }
  }
})
