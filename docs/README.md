```sh
                  _ _       _           _                          _                       
  _ __ ___   __ _| | |  ___| |__   __ _| |_   ___ _ __ ___  _ __  (_) ___   _ __ ___   ___ 
 | '_ ` _ \ / _` | | | / __| '_ \ / _` | __| / __| '__/ _ \| '_ \ | |/ _ \ | '_ ` _ \ / _ \
 | | | | | | (_| | | || (__| | | | (_| | |_ | (__| | | (_) | | | || |  __/_| | | | | |  __/
 |_| |_| |_|\__,_|_|_(_)___|_| |_|\__,_|\__(_)___|_|  \___/|_| |_|/ |\___(_)_| |_| |_|\___|
                                                                |__/                       
01101101 01100001 01101100 01101100 00101110 01100011 01101000 01100001 01110100 00101110 
01100011 01110010 01101111 01101110 01101010 01100101 00101110 01101101 01100101 
```
> Mall Chat Bot Generator

- [Getting Started](./gettingStarted.md)
- [Current Progress](./curretProgress.md)
- [Themes](./themes.md)

### Notion API and SDK
- [Notion API](./notionAPI.md)
- [Notion URL and CMS](./notionAsCMS.md)
- [Authentication with Nuxt DB and JWT](./notionAuth.md)
- [Notion Database Reference]./(notionDBRef.md)

### Useful for this project
- [Singletons](singletons.md)
- [Load custom .env file](./customenv.md)
- [Tailwind CSS Cheat Sheet](https://flowbite.com/tools/tailwind-cheat-sheet)
- [Pinia Store](./piniaStore.md)

### Data
- [City Data - back4app](./cityData.md)

### Pricing Models
- [Maintenance and costing](./sla.md)

### Chat Bot Creation and Optimization
- [Creating a new mall Bot](./mallChatAdmin.md)
- [Customizing Mall Bot](./mallConfig.md)
- [Some optimizations](./optimize.md)

### Information for collaboration
- [Feature Request](./newFeature.md)
- [Report a bug](./bugReport.md)

### Packages
- [x] 💨 [Tailwind CSS v3](https://tailwindcss.com/) with [Windicss](https://windicss.org/)
- [x] ✨ [Headless UI](https://headlessui.dev/)
- [x] 🔔 [Icon Pack Component (unplugin-icons)](https://icones.js.org/)
- [x] 🛹 [State & Store Management (Pinia)](https://pinia.vuejs.org/)
- [x] 🚩 [Localization (i18n) by @intlify](https://github.com/intlify/nuxt3) & Auto Generate Locales
- [x] 🔏 [@sidebase/nuxt-auth](https://sidebase.io/nuxt-auth)
- [x] 📦 [Vue Composition Collection (Vueuse)](https://vueuse.org/)
- [x] 📚 [Content Management System (Nuxt Content)](https://content.nuxtjs.org/) [SSR]
- [x] 🌙 Switch Theme (light, dark, system, realtime)
- [x] 🇮🇩 Language Switcher
- [x] 🪝 Built-in Component & Layout
- [x] Eslint & Prettier
- [x] Husky & Commit lint
- [x] Custom Workspace Snippets
- [x] Built-in Unit Test
- [x] Configurable Theme
  - [x] Primary Colors
  - [x] Font

## Table of Contents
- [Mall Chat Admin](#mall-chat-admin)
  - [Features](#features)
  - [To Do](#to-do)
  - [Preview](#preview)
  - [Table of Contents](#table-of-contents)
  - [Quick Start](#quick-start)
    - [Start with this template](#start-with-this-template)
    - [Deploy as Static Site](#deploy-as-static-site)
  - [Built-in Components](#built-in-components)
  - [Notes](#notes)
    - [Nuxt Content](#nuxt-content)
    - [Custom Workspace Snippets](#custom-workspace-snippets)
    - [Styles](#styles)
    - [Theme (Dark Mode)](#theme-dark-mode)
    - [Localization](#localization)
    - [Generate Locales](#generate-locales)
    - [Icons](#icons)
    - [Precommit and Postmerge](#precommit-and-postmerge)
  - [License](#license)

## Start dev server

- Install dependencies `pnpm install --shamefully-hoist`
- Run `pnpm dev` to start development server and open `http://localhost:3000` in your browser

### Deploy as Static Site
* Run `pnpm generate` to build the project
* Serve `dist/` folder
Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment).

## Available Components
- [x] Footer
- [x] Button
- [x] Anchor (link)
- [x] Alert
- [x] Card
- [x] Action Sheet
- [x] Theme Toggle / Switcher
- [x] Navbar
  - [x] Navbar Builder
  - [x] Drawer (on mobile)
  - [x] Options (on mobile)
- [x] Page Layout
  - [x] Wrapper
  - [x] Header
    - [x] Title
  - [x] Body
    - [x] Section
      - [x] Section Wrapper
      - [x] Section Title
- [x] Dashboard Layout
    - [x] Sidebar
- [ ] Modal

## Notes
### Nuxt Content

### Styles
Tailwindcss import managed by windicss.
and you can add custom styles in :

```sh
/path/to/assets/sass/app.scss
```
### Theme (Dark Mode)
ThemeManager is a plugin that allows you to switch between themes. this lib in :
```sh
/path/to/utils/theme.ts
```
`Thememanager` is a function-class construct when app.vue before mounted. theme construct inside `AppSetup()` in `/path/to/app.vue` :
```vue
<!-- /path/to/app.vue -->
<script lang="ts" setup>
import { AppSetup } from '~/utils/app';
// app setup
AppSetup()
</script>
```

To change theme, you can direct set theme from state `theme.setting`, example :

```vue
<script lang="ts" setup>
  import { IThemeSettingOptions } from '~/utils/theme'
  const themeSetting = useState<IThemeSettingOptions>('theme.setting')
  themeSetting.value = 'dark'
</script>
```
When you change state `theme.setting`, it will automatically change theme.

Theme Setting have 4 options :
- `light`
- `dark`
- `system` (operating system theme)
- `realtime` (realtime theme, if 05:00 - 17:00, it will change to light theme, otherwise dark)

We have state `theme.current`, this state return `light` or `dark` theme. basically it's process from `theme.setting`.
dont change theme with this state.
### Localization
Localization is a plugin that allows you to switch between languages. this lib in :

```sh
/path/to/utils/lang.ts
```

`LanguageManager` is a function-class construct when app.vue before mounted.
this lib depend on [@intlify/nuxt3](https://github.com/intlify/nuxt3)
lang construct inside `AppSetup()` in `/path/to/app.vue` :

```vue
<!-- /path/to/app.vue -->
<script lang="ts" setup>
  import { AppSetup } from '~/utils/app';
  // app setup
  AppSetup()
</script>
```

To change language, you can direct set language from state `lang.setting`, example :

```vue
<script lang="ts" setup>
const langSetting = useState<string>('locale.setting')
langSetting.value = 'en'
</script>
```
When you change state `locale.setting`, it will automatically change language.

### Generate Locales

I made an automatic tool to automatically translate to all languages ​​that have been prepared in the ./locales/ folder
So, you can just update "locales/en.yml" and run this tools, it will automatically translate to all languages.

You can just run:

```sh
pnpm generate:locales
# or :
node ./tools/translator.js ./locales en.yml
```

### Icons
This project using unplugin-icons for auto generate and import icon as component.

You can see collection icon list in : [https://icones.js.org/](https://icones.js.org/)

you can use `<prefix-collection:icon />` or `<PrefixCollection:Icon />`.

in this project, configuration prefix as a "icon", you can see in `nuxt.config.ts`:

```js
export default defineNuxtConfig({
  ...
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
  ...
})
```

#### Example:

```vue
// use icon from collection "Simple Icons" and name icon is "nuxtdotjs"
<IconSimpleIcons:nuxtdotjs />

// use icon from collection "Unicons" and name icon is "sun"
<IconUil:sun />
```
### Pre-commit and Post-merge

This project using husky and `commit-lint` for `pre-commit` and `post-merge`.
when you commit, it will check your commit message and running `pnpm lint-staged` to check your staged files.
configuration in : `/path/to/.husky/pre-commit` and `/path/to/commitlint.config.js`

And when Postmerge, it will run "pnpm" to automatically install new dependencies.
configuration in `/path/to/.husky/post-merge`

## License
This project is licensed under the MIT license, Copyright (c) 2023 Charl Cronje. For more information see the [LICENSE](LICENSE.md) file.
