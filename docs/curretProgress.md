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

## 6. Create custom Authentication

I will be using `Pinia` and `jsonwebtoken`

- Install Pinia

```sh
npm i @pinia/nuxt
# or
yarn add @pinia/nuxt
# or
pnpm add @pinia/nuxt
```

- Update `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@pinia/nuxt'],
})
```

- Create `~/store/auth.ts`

```ts
// store/auth.ts
import { error } from 'console';
import { defineStore } from 'pinia';
import jwt from 'jsonwebtoken';
const config = useRuntimeConfig();
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: config.notionApiKey });
const dbId = config.notionDB.users;

interface UserI {
    id: string;
    avatar?: string;
    fullName?: string;
    email: string;
    password: string;
    company?: string;
    roles?: string[];
}


export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        loading: false,
    }),
    actions: {
        async authenticateUser(payload : UserI) {
            const response = await notion.databases.query({
                database_id: config.notionDB.users,
                filter: {
                    and: [
                        {
                            property: "Email Address",
                            email: {
                                equals: payload.email
                            }
                        },
                        {
                            property: "Password",
                            rich_text: {
                                equals: payload.password
                            }
                        }
                    ]
                }
            });

            // Extract the person's details from the response
            if (response.results.length > 0) {
                // Create and sign the token
                const token = jwt.sign({ username: payload.email }, config.secretKey, {
                    expiresIn: '1h',
                });
        
                // Save the token in a cookie
                const tokenCookie = useCookie('token');
                tokenCookie.value = token;
                this.authenticated = true;

                const data = response.results[0];

                // Get the avatar image URL
                const avatar = data.properties.Avatar.files[0].external.url;

                // Get the company page ID
                const companyId = data.properties.Company.relation[0].id;

                // Get the company page details
                const companyPage = await notion.pages.retrieve(companyId);

                // Get the company name
                const companyName = companyPage.properties.Name.title[0].plain_text;

                // Map the Notion row to a new Person object
                const user:UserI = {
                    id: data.id,
                    avatar: avatar,
                    fullName: data.properties["Full Name"].title[0].plain_text,
                    email: data.properties["Email Address"].email,
                    password: data.properties.Password.rich_text[0].plain_text,
                    company: companyName
                };
            } else {
                con
            }
        },
        logUserOut() {
            const token = useCookie('token');
            this.authenticated = false;
            token.value = null;
        },
    },
});
```

- Create `~/middleware/auth.global.ts`, because it's got the word `global` added to the file name the middleware will be applied to all routes, so below I am excluding the login and home page from the middleware by adding those two routes to `excludedRoutes` constant

```ts
// middleware/auth.global.ts
import { useAuthStore } from '~/store/auth';
import jwt from 'jsonwebtoken';
const config = useRuntimeConfig();
import { useRouter } from 'vue-router';

export const useAuthMiddleware = () => {
    const auth = useAuthStore();
    const router = useRouter();
    const token = useCookie('token');
    const excludedRoutes = ['/login', '/'];

    // Check if the current route is in the excludedRoutes array
    if (excludedRoutes.includes(router.currentRoute.value.path)) {
        return;
    }

    try {
        // Verify the token
        jwt.verify(token.value!, config.secretKey);
        auth.authenticated = true;
    } catch (err) {
        // If the token is invalid or expired, set authenticated to false and remove the token
        auth.authenticated = false;
        token.value = null;
    }

    if (!auth.authenticated) {
        router.push('/login');
    }
};
```
