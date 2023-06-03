# Current Progress

I will be using `yarn` for this project and `npm` for global installs

## 1. Install Nuxt 3

The best way to install `nuxt3` at the time of the document is to use the method below

```sh
npx nuxi@latest init mall.chat.cronje.me
```

After that is done, install the dependencies

```sh
yarn
```

## 2. Started this documentation

I will be documenting as I go along.

- 2.1 Documentation

I have written docs on the following topics so far

- [Notion URL and CMS](./notionAsCMS.md)
- [Customizing Mall Bot](./mallConfig.md)
- [Some optimizations](./optimize.md)
- [Feature Request](./newFeature.md)
- [Report a bug](./bugReport.md)


## 3. Added some artwork

- I have added all the chat bot images in the public folder, all together about 50 images now located in the `/public/img/bot` folder
- I also added the logo to the public folder under the `/public/ui` folder
- Added a Favicon to `/public`

## 4. Added .env file

I added some env variables:

```conf
AUTH_DOMAIN=
AUTH_CLIENT_ID=
AUTH_CLIENT_SECRET=
```

## Added Tailwind CSS

First install te packages

```sh
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

Then update `nuxt.config.js`

```ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
```

Update `tailwind.config.js`

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

Add `css` file `/assets/css/main.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Add your newly-created `./assets/css/main.css` to the `css` array in your `nuxt.config.ts` file.

```js
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

- Start your build process
- Run your build process with `yarn dev`

Edit `app.vue` to test

```vue
<template>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</template>
```

## Added DaisyUI

this one is simple

```sh
yarn add daisyui
```

Edit `tailwind.config.js`

```js
// Add daisyui to the plugins array
plugins: [
    require("daisyui")
]
```

So at this time `tailwind.config.js` should look something like this

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
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ]
}
```
