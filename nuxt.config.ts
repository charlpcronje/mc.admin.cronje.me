import UnpluginComponentsVite from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
// @ts-ignore
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
    plugins: [
        '~/plugins/pinia.ts',
        '~/plugins/navbar.ts'
    ],

    // build
    build: {
        transpile: ['@headlessui/vue'],
        // extend(config: any, { isDev, isClient }: { isDev: boolean, isClient: boolean }) {
        //     if (isDev && isClient) {
        //         config.module.rules.push({
        //             enforce: 'pre',
        //             test: /\.(js|ts|vue)$/,
        //             loader: 'source-map-loader',
        //             exclude: [
        //                 /node_modules\/element-plus/
        //             ]
        //         })
        //     }
        // },
        verbose: false
    },

    // modules
    modules: [
        '@pinia/nuxt',
        'unplugin-icons/nuxt',
        '@intlify/nuxt3',
        '@nuxt/content',
        '@vueuse/nuxt',
        'nuxt-windicss',
        'nuxt-icon',
        '@element-plus/nuxt',
        '@nuxt/devtools',
        '@sidebase/nuxt-session'
    ],
    devtools: {
        // Enable devtools (default: true)
        enabled: true,
        // VS Code Server options
        vscode: {
            VSCodeIntegrationOptions: {
                enabled: true,
                startOnBoot: false,
                port: 3080,
                reuseExistingServer: true,
                mode: 'local-serve', // 'local-serve' or 'remote-ssh'
                tunnel: {
                    name: 'my-vscode-server',
                }
            }
        }
    },

    elementPlus: {
        /** Options */
    },

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
        head: {
            script: [{
                hid: 'clarity',
                src: 'https://www.clarity.ms/tag/hla1pbbh65',
                async: true,
            }],
        },
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
                port: 5000,
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

    image: {
        domains: ['amazonaws.com'],
        presets: {
            avatar: {
                modifiers: {
                    format: 'jpg',
                    width: 50,
                    height: 50
                }
            }
        }
    },

    runtimeConfig: {
        public: {
            apiBase: '/api'
        },
        cookieName: process.env.COOKIE_NAME || "__session",
        cookieSecret: process.env.COOKIE_SECRET || "secret",
        cookieExpires: parseInt(process.env.COOKIE_REMEMBER_ME_EXPIRES!.toString(), 10), // 1 day
        cookieRememberMeExpires: parseInt(process.env.COOKIE_REMEMBER_ME_EXPIRES!.toString(), 10), // 7 days

        secretKey: process.env.SECRET_KEY,
        notionApiKey: process.env.NOTION_API_KEY,
        notionDB: {
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
