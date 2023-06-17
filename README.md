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
# Mall Chat Admin

For the detailed documentation, have a look in the `/docs` folder, or follow this link: [Documentation](./docs/README.md)

- [Feature Request](./newFeature.md)
- [Report a bug](./bugReport.md)

## Basic description of the app

Creating Mall Chat bots for all the malls are challenging for the following reasons

- Getting a list of all the malls in South Africa has proven to be difficult and I can never be sure that I found them all
- Finding Information on all the malls are in some cases challenging as well as some of the smaller malls don't have a website
- Getting info on smaller malls are mostly from Google Maps and other Search Engines

There are more reasons, that I'm not going into right now, but I have decided to rather build a tool to create Mall Chat Bots as needed.

To save some time I decided to use [Notion](https://notion.so) as a type of CMS for all the Chat Bots, and while I'm bust also for user authentication.
In Notion I created the following DB Tables






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

- [Getting Started](./docs/gettingStarted.md)
- [Current Progress](./docs/curretProgress.md)

### Notion API and SDK
- [Notion API](./docs/notionAPI.md)
- [Notion URL and CMS](./docs/notionAsCMS.md)
- [Authentication with Nuxt DB and JWT](./docs/notionAuth.md)
- [Notion Database Reference](./docs/notionDBRef.md)

### Useful for this project
- [Singletons](./docs/singletons.md)
- [Load custom .env file](./docs/customenv.md)
- [Tailwind CSS Cheat Sheet](https://flowbite.com/tools/tailwind-cheat-sheet)
- [Pinia Store](./docs/piniaStore.md)

### Data
- [City Data - back4app](./docs/cityData.md)

### Pricing Models
- [Maintenance and costing](./docs/sla.md)

### Chat Bot Creation and Optimization
- [Creating a new mall Bot](./docs/mallChatAdmin.md)
- [Customizing Mall Bot](./docs/mallConfig.md)
- [Some optimizations](./docs/optimize.md)

### Information for collaboration
- [Feature Request](./docs/newFeature.md)
- [Report a bug](./docs/bugReport.md)

### Packages
- [-] 💨 [Tailwind CSS v3](https://tailwindcss.com/) with [Windicss](https://windicss.org/)
- [-] ✨ [Headless UI](https://headlessui.dev/)
- [-] 🔔 [Icon Pack Component (unplugin-icons)](https://icones.js.org/)
- [-] 🛹 [State & Store Management (Pinia)](https://pinia.vuejs.org/)
- [-] 🚩 [Localization (i18n) by @intlify](https://github.com/intlify/nuxt3) & Auto Generate Locales
- [-] 📦 [Vue Composition Collection (Vueuse)](https://vueuse.org/)
- [-] 📚 [Content Management System (Nuxt Content)](https://content.nuxtjs.org/) [SSR]
- [-] 🌙 Switch Theme (light, dark, system, realtime)
- [-] 🇮🇩 Language Switcher
- [-] 🪝 Built-in Component & Layout
- [-] Eslint & Prettier
- [-] Custom Workspace Snippets
- [-] Built-in Unit Test
- [-] Configurable Theme
  - [-] Primary Colors
  - [-] Font

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
  - [License](#license)

## Start dev server

- Install dependencies `pnpm install --shamefully-hoist`
- Run `pnpm dev` to start development server and open `http://localhost:3000` in your browser

### Deploy as Static Site
* Run `pnpm generate` to build the project
* Serve `dist/` folder
Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment).

## Available Components
- [-] Footer
- [-] Button
- [-] Anchor (link)
- [-] Alert
- [-] Card
- [-] Action Sheet
- [-] Theme Toggle / Switcher
- [-] Navbar
  - [-] Navbar Builder
  - [-] Drawer (on mobile)
  - [-] Options (on mobile)
- [-] Page Layout
  - [-] Wrapper
  - [-] Header
    - [-] Title
  - [-] Body
    - [-] Section
      - [-] Section Wrapper
      - [-] Section Title
- [-] Dashboard Layout
    - [-] Sidebar
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
don't change theme with this state.
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


## License
This project is licensed under the MIT license, Copyright (c) 2023 Charl Cronje. For more information see the [LICENSE](LICENSE.md) file.
