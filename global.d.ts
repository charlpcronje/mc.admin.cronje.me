import { IntlifyModuleOptions } from '@intlify/nuxt3'
import { VueUseNuxtOptions } from '@vueuse/nuxt'
import { ModuleOptions as NuxtWindiCssModuleOptions } from 'nuxt-windicss'
import { ModuleOptions as NuxtContentModuleOptions } from '@nuxt/content'

declare module '@nuxt/schema' {
    interface AppConfigInput {
        name: string
        author: {
            name: string
            link: string
        }
    }
}

declare module 'nuxt/config' {
    interface NuxtConfig {
        intlify?: IntlifyModuleOptions
        vueuse?: VueUseNuxtOptions
        windicss?: NuxtWindiCssModuleOptions
        content?: Partial<NuxtContentModuleOptions>
        image?: any
        elementPlus?: any
        devtools?: any
    }
}

declare global {
    function isDev(): boolean
    function isProd(): boolean
    function isStage(): boolean
}

export { }
