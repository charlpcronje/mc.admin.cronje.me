# Getting Started

For this project I will be using the following packages

- [Nuxt 3](https://nuxt.com)
- [Tailwind CSS](https://tailwindcss.co)
- [DaisyUI](https://daisyui.com)
- [Pinia](https://pinia.vuejs.org) 
- [Notion API](https://developers.notion.com)


I could not find a nice starter for what I need so I am starting from Scratch

## Installing Nuxt 3

```sh
npx nuxi init [app_name]
```

## Installing Tailwind CSS

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

Then edit `nuxt.config.ts`

```ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        '~/assets/css/main.css',
    ],
    
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
});
```

Then edit `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Create an `./assets/css/main.css` file and add the @tailwind directives for each of Tailwind’s layers.


```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Add your newly-created `./assets/css/main.css` to the css array in your `nuxt.config.js` file.

```ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
```

Start using Tailwind’s utility classes to style your content.

```vue
// app.vue
<template>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</template>
```

## DaisyUI

```sh
yarn add --dev daisyui
```

Edit `tailwind.config.js` and add it as a plugin

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue"
    ],  theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
}
```

Update `app.vue` to test

```vue
<template>
  <div class="p-4">
    <button class="btn">Hello daisyUI</button>
  </div>
</template>
```

## Pinia State Management

I could have used `useState` for state management but considering I'm using Notion for Authentication and using custom JWT Token I am using Pinia

Pinia is a state management library for Vue, with an officially-supported module for Nuxt 3 (`@pinia/nuxt`). It's also the recommended solution for Vue and Nuxt projects.

```sh
yarn add @pinia/nuxt pinia
# or with npm
npm install @pinia/nuxt pinia
```

Add the module to your Nuxt configuration (`nuxt.config.ts`)):

```ts
export default defineNuxtConfig({
  // ...
  modules: [
    // ...
    '@pinia/nuxt',
  ],
})
```

## Installing Notion API 


https://www.phind.com/search?cache=b8fd5392-e641-4409-9a2c-405b49670476

```sh
npm install @notionhq/client -D

# Yarn

yarn add @notionhq/client --dev
```

Install the corresponding type declarations for the '@notionhq/client' package. Usually, type declarations are included in the main package, but if they are not, you can try installing them separately using the following command:

```sh
npm install notion-api-types -D

# Yarn

yarn add notion-api-types --dev
```


Create a `.env` file in the root of your project with your Notion API key:

```env
NOTION_API_KEY=your_notion_api_key
```

Update your `nuxt.config.ts` file to include the dotenv module and the environment variables:

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available server-side
    notionApiKey: process.env.NOTION_API_KEY,
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api'
    }
  },
  plugins: ['~/plugins/notion.ts'],
})
```

These variables are exposed to the rest of your application using the useRuntimeConfig composable.

```vue
<script setup>
const runtimeConfig = useRuntimeConfig()
</script>
```

## Install Yup for Validation

Use Yup for error handling and validation:

```sh
npm install yup
#
yarn add yup
```

##  Install JWT authentication

```sh
npm install jsonwebtoken bcrypt
npm install --save @types/jsonwebtoken
npm install --save @types/bcrypt
#
yarn add jsonwebtoken bcrypt
yarn add @types/jsonwebtoken
yarn add @types/bcrypt
```
