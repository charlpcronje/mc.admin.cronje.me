import { useI18n } from 'vue-i18n'

export interface ILocales {
  [key: string]: {
    name: string
    iso: string
    flag: string
  }
}

export const availableLocales: ILocales = {
  en: {
    name: 'English',
    iso: 'en',
    flag: '🇺🇸',
  },
  af: {
    name: 'Afrikaans',
    iso: 'af',
    flag: '🇺🇸',
  },
  xh: {
    name: 'Xhosa',
    iso: 'xh',
    flag: 'za',
  },
  zu: {
    name: 'Zulu',
    iso: 'zu',
    flag: 'za',
  },
  nso: {
    name: 'Sesotho sa Leboa',
    iso: 'nso',
    flag: 'za',
  },
  st: {
    name: 'Sesotho',
    iso: 'st',
    flag: 'za',
  },
  ve: {
    name: 'Venda',
    iso: 've',
    flag: 'za',
  },
  nr: {
    name: 'isiNdebele',
    iso: 'nr',
    flag: 'za',
  },
  ts: {
    name: 'Tsonga',
    iso: 'ts',
    flag: 'za',
  },
  id: {
    name: 'Bahasa',
    iso: 'id',
    flag: '🇮🇩',
  },
  ja: {
    name: '日本語',
    iso: 'ja',
    flag: '🇯🇵',
  },
  ko: {
    name: '한국어',
    iso: 'ko',
    flag: '🇰🇷',
  },
  zh: {
    name: '简体中文',
    iso: 'zh',
    flag: '🇨🇳',
  },
  tr: {
    name: 'Türkçe',
    iso: 'tr',
    flag: '🇹🇷',
  },
}

export function LanguageManager() {
  // composable
  const { locale } = useI18n()
  const localeUserSetting = useCookie('locale')

  // methods
  const getSystemLocale = (): string => {
    try {
      const foundLang = window
        ? window.navigator.language.substring(0, 2)
        : 'en'
      return availableLocales[foundLang] ? foundLang : 'en'
    } catch (error) {
      return 'en'
    }
  }
  const getUserLocale = (): string =>
    localeUserSetting.value || getSystemLocale()

  // state
  const localeSetting = useState<string>('locale.setting', () =>
    getUserLocale()
  )

  // watchers
  watch(localeSetting, (localeSetting) => {
    localeUserSetting.value = localeSetting
    locale.value = localeSetting
  })

  // init locale
  const init = () => {
    localeSetting.value = getUserLocale()
  }
  locale.value = localeSetting.value

  // lifecycle
  onBeforeMount(() => init())

  return {
    localeSetting,
    init,
  }
}
