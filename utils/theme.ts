export type IThemeSettingOptions = 'dark' | 'light' | 'system' | 'realtime'

export type ITheme = 'dark' | 'light'

export const availableThemes: {
    key: IThemeSettingOptions
    text: string
}[] = [
        { key: 'light', text: 'Light' },
        { key: 'dark', text: 'Dark' },
        { key: 'system', text: 'System' },
        { key: 'realtime', text: 'Realtime' },
    ]

const alwaysDark = true;

export function ThemeManager() {
    // composable
    const themeUserSetting = useCookie<IThemeSettingOptions>('theme')

    // methods
    const getUserSetting = (): IThemeSettingOptions => {
        if (alwaysDark) {
            return 'dark';
        }
        return themeUserSetting.value || 'system'
    }
    const getSystemTheme = (): ITheme => {
        if (alwaysDark) {
            return 'dark';
        }
        try {
            return window
                ? window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light'
                : 'dark'
        } catch (error) {
            return 'dark'
        }
    }
    const getRealtimeTheme = (): ITheme => {
        if (alwaysDark) {
            return 'dark';
        }
        const now = new Date()
        const hour = now.getHours()
        const isNight = hour >= 17 || hour <= 5
        return isNight ? 'dark' : 'light'
    }

    // state
    const themeSetting = useState<IThemeSettingOptions>('theme.setting', () =>
        getUserSetting()
    )
    const themeCurrent = useState<ITheme>('theme.current', () =>
        process.client ? getSystemTheme() : 'light'
    )

    // watchers
    const onThemeSettingChange:any = (themeSetting: IThemeSettingOptions) => {
        if (alwaysDark) {
            themeCurrent.value = 'dark';
        } else {
            themeUserSetting.value = themeSetting
            if (themeSetting === 'realtime') {
                themeCurrent.value = getRealtimeTheme()
            } else if (themeSetting === 'system') {
                themeCurrent.value = getSystemTheme()
            } else {
                themeCurrent.value = themeSetting
            }
        }
    }
    watch(themeSetting, (val) => onThemeSettingChange(val))
    const onThemeSystemChange = () => {
        if (alwaysDark) {
            themeCurrent.value = 'dark';
        } else {
            if (themeSetting.value === 'system') {
                themeCurrent.value = getSystemTheme()
            }
        }
    }
    const onRealtimeCheck = () => {
        if (alwaysDark) {
            themeCurrent.value = 'dark';
        } else {
            if (themeSetting.value === 'realtime') {
                themeCurrent.value = getRealtimeTheme()
            }
        }
    }

    // init theme
    const init = () => {
        themeSetting.value = getUserSetting()
    }
    onThemeSettingChange(themeSetting.value)

    // lifecycle
    let intervalCheckTime: NodeJS.Timer
    onBeforeMount(() => init())
    onMounted(() => {

        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', onThemeSystemChange)
        intervalCheckTime = setInterval(onRealtimeCheck, 1000)
    })
    onBeforeUnmount(() => {
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .removeEventListener('change', onThemeSystemChange)
        if (intervalCheckTime) clearInterval(intervalCheckTime)
    })

    return {
        themeSetting,
        themeCurrent,

        getUserSetting,
        getSystemTheme,
        getRealtimeTheme,
    }
}
