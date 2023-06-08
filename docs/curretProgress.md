# Current Progress

I will be using `yarn` for this project and `npm` for global installs

## 1. Install Nuxt 3

The best way to install `nuxt3` at the time of the document is to use the method below

```sh
npx nuxi@latest init mc.admin.cronje.me
```

After that is done, install the dependencies

```sh
npm install
# or
yarn
# or
pnpm install
```

Then run the project

```sh
npm run dev
# or
yarn dev
# or
pnpm dev
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
NOTION_API_KEY=
# DB's
NOTION_MALLS_DB=
NOTION_ART_DB=
NOTION_CITIES_DB=
NOTION_REGIONS_DB=
NOTION_BOTS_DB=
NOTION_COMPANIES_DB=
NOTION_USERS_DB=
```

## 5. Added Tailwind CSS

First install te packages

```sh
yarn add -D tailwindcss postcss autoprefixer
# or
npm install -D tailwindcss postcss autoprefixer
# or
pnpm add -D tailwindcss postcss autoprefixer
```

Then create the config file

```sh
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

## 6. Add @sidebase/nuxt-auth

```sh
yarn add @sidebase/nuxt-auth
# or
npm install @sidebase/nuxt-auth
# or
pnpm add @sidebase/nuxt-auth
```

Add the module to `nuxt.config.ts`

```ts
// https://nuxt.com/docs/api/configuration-nuxt-config

export default defineNuxtConfig({
  modules: [
    '@sidebase/nuxt-auth',
  ]
})
```

Create file `server/api/auth/[...].ts`

```ts
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
    // secret needed to run nuxt-auth in production mode (used to encrypt data)
    secret: process.env.NUXT_SECRET,
    providers: [
        // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
        GithubProvider.default({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
        CredentialsProvider.default({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              username: { label: 'Username', type: 'text', placeholder: '(hint: jsmith)' },
              password: { label: 'Password', type: 'password', placeholder: '(hint: hunter2)' }
            },
            authorize (credentials: any) {
              // You need to provide your own logic here that takes the credentials
              // submitted and returns either a object representing a user or value
              // that is false/null if the credentials are invalid.
              // NOTE: THE BELOW LOGIC IS NOT SAFE OR PROPER FOR AUTHENTICATION!

              const user = { id: '1', name: 'J Smith', username: 'jsmith', password: 'hunter2', image: 'https://avatars.githubusercontent.com/u/25911230?v=4' }

              if (credentials?.username === user.username && credentials?.password === user.password) {
                // Any object returned will be saved in `user` property of the JWT
                return user
              } else {
                // eslint-disable-next-line no-console
                console.error('Warning: Malicious login attempt registered, bad credentials provided')

                // If you return null then an error will be displayed advising the user to check their details.
                return null

                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
              }
            }
        })
    ]
})
```

