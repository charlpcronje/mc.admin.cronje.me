# Authentication with Nuxt DB and JWT

To do authentication with a Notion database we can use the following example Database structure

## Database Structure

### `Users` Database

- ID (Formula id())
- Full Name (String)
- Email Address (Email)
- Password (String)
- Company (Relation to Companies Table)
- Role (Multi-Select)

### Companies

For the companies Database I have the following Columns:
- ID (Formula id())
- Company Name
- Description
- Email
- Contact Number
- Contact Person


## Outline

- I want to authenticate a user with the Email Address and Password field in the Users Database use it JWT authentication in my Nuxt 3 Application. I want to use Pinia for State Management.
- I am not sure how the JWT Tokens work and where to store them, so also suggest if I should create another database in Notion to save the tokens.
- I also need middleware to check the routes the user is authenticated against the roles column in the Users Database.
- I also want the Notion Client to run as a Singleton

To achieve your requirements, you can follow these steps:

1. Set up Notion API and create a singleton Notion client.
2. Create a JWT authentication system.
3. Set up Pinia for state management.
4. Create middleware for route authentication.
5. Use Yup for error handling and validation.

First, set up the Notion API by following the official guide: https://developers.notion.com/docs/getting-started

## Installation

Next, install the required packages for your Nuxt 3 application:

```sh
npm install @nuxtjs/axios @nuxtjs/auth-next @notionhq/client pinia
```

Now, create a Pinia store for state management. In your `src` folder, create a folder named `store` and inside it, create a file named `user.ts`:

Let's start with setting up the Notion API and creating a singleton Notion client:


## Notion Client Singleton

```ts
/*
src/
  ├── utils/
  │   └── notionClientSingleton.js
*/

import { Client } from '@notionhq/client';

class NotionClientSingleton {
  constructor() {
    if (!NotionClientSingleton.instance) {
      NotionClientSingleton.instance = new Client({ auth: process.env.NOTION_API_KEY });
    }
  }

  getInstance() {
    return NotionClientSingleton.instance;
  }
}

const notionClient = new NotionClientSingleton().getInstance();
export default notionClient;
```

###  JWT authentication

Now, let's create a JWT authentication system. First, install the required packages:

```sh
npm install jsonwebtoken bcrypt
npm install --save @types/jsonwebtoken
npm install --save @types/bcrypt
#
yarn add jsonwebtoken bcrypt
yarn add @types/jsonwebtoken
yarn add @types/bcrypt
```

Create a utility file for JWT-related functions:

```ts
/*
src/
  ├── utils/
  │   ├── jwtUtils.ts
*/
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY: string = process.env.JWT_SECRET;

interface User {
  id string;
  role: string[];
}

export const generateToken = (user: User): string => {
  return jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token: string): User | null => {
  try {
    return jwt.verify(token, SECRET_KEY) as User;
  } catch (error) {
    return null;
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
```

### For state management, set up Pinia:

```sh
npm install pinia
```

Create a Pinia store for user authentication:

```ts
/*
src/
  ├── store/
  │   └── authStore.js
*/
import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    setToken(token) {
      this.token = token;
    },
  },
});
```

Create a middleware for route authentication:

```ts
/*
src/
  ├── utils/
  │   ├── authMiddleware.js
*/
import { defineMiddleware } from 'nuxt3';
import { useAuthStore } from '@/store/auth';
import { verifyToken } from '@/utils/jwt';

export default defineMiddleware({
  name: 'auth',
  initialize({ store }) {
    store.useAuthStore();
  },
  handler({ to, from, next }) {
    const authStore = useAuthStore();
    const token = authStore.token;

    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        authStore.setUser(decoded);
        next();
      } else {
        authStore.setToken(null);
        authStore.setUser(null);
        next('/login');
      }
    } else {
      next('/login');
    }
  },
});
```

## Error Handling and Auth

Finally, use Yup for error handling and validation:

```sh
npm install yup
```

### validation schema for user authentication:

```ts
/*
src/
  ├── validationSchemas/
  │   └── validationSchemas.js
*/
import * as yup from 'yup';

export const authSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});
```

## Some improvements

Now, let's implement a refresh token function. First, update the `jwtUtils.js` 

```ts
/*
src/
  │   ├── jwtUtils.js
*/
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY = process.env.JWT_SECRET;
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET;

export const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, REFRESH_SECRET_KEY, { expiresIn: '7d' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (refreshToken) => {
  try {
    return jwt.verify(refreshToken, REFRESH_SECRET_KEY);
  } catch (error) {
    return null;
  }
};

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
```

Update the `authStore.js` file to include refresh token:

```ts
/*
src/
  ├── store/
  │   └── authStore.js
*/
import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null,
    token: null,
    refreshToken: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    setToken(token) {
      this.token = token;
    },
    setRefreshToken(refreshToken) {
      this.refreshToken = refreshToken;
    },
  },
});
```

## Implement the middleware

Here's an example route and how to implement the middleware:

1. First, create a routes.js file:

```ts
/*
src/
  └── router.ts
*/
import { defineNuxtConfig } from 'nuxt3';
import { createRouter, createWebHistory } from 'vue-router@next';
import authMiddleware from '@/middleware/auth';

export default defineNuxtConfig({
  router: createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: 'pages/index.vue',
      },
      {
        path: '/login',
        component: 'pages/login.vue',
      },
      {
        path: '/protected',
        component: 'pages/protected.vue',
        beforeEnter: authMiddleware.handler,
      },
    ],
  }),
});
```

This example assumes you have a `Home.vue`, `Login.vue`, and `Dashboard.vue` components. The `authMiddleware` is applied to the `/dashboard` route, so users must be authenticated to access it.

## Some page examples

```vue
<template>
  <div class="p-8">
    <h1 class="text-center text-3xl font-bold">Login</h1>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="email" class="sr-only">Email:</label>
        <input type="email" id="email" v-model="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label for="password" class="sr-only">Password:</label>
        <input type="password" id="password" v-model="password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <button type="submit" class="w-full py-2 px-4 bg-indigo-500 text-white font-bold rounded-md hover:bg-indigo-600">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/store/auth';
import { authSchema } from '~/validationSchemas';
import { loginUser } from '~/api/auth';

const router = useRouter();
const authStore = useAuthStore();
const email = ref('');
const password = ref('');

const handleSubmit = async () => {
  try {
    await authSchema.validate({ email: email.value, password: password.value });
    const { token, refreshToken, user } = await loginUser(email.value, password.value);
    authStore.setToken(token);
    authStore.setRefreshToken(refreshToken);
    authStore.setUser(user);
    router.push('/dashboard');
  } catch (error) {
    console.error(error);
  }
};
</script>
<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { authSchema } from '@/validationSchemas';
import { loginUser } from '@/api/auth'; // You need to create this function to handle the login process

export default {
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const email = ref('');
    const password = ref('');

    const handleSubmit = async () => {
      try {
        await authSchema.validate({ email: email.value, password: password.value });
        const { token, refreshToken, user } = await loginUser(email.value, password.value);
        authStore.setToken(token);
        authStore.setRefreshToken(refreshToken);
        authStore.setUser(user);
        router.push('/dashboard');
      } catch (error) {
        console.error(error);
      }
    };

    return { email, password, handleSubmit };
  },
};
</script>
```

## Project Structure

```
src/
  ├── api/
  │   └── auth.js
  ├── components/
  ├── pages/
  │   ├── Dashboard.vue
  │   ├── Home.vue
  │   └── Login.vue
  ├── store/
  │   └── authStore.js
  ├── utils/
  │   ├── authMiddleware.js
  │   ├── jwtUtils.js
  │   └── notionClientSingleton.js
  ├── validationSchemas/
  │   └── validationSchemas.js
  ├── App.vue
  ├── main.js
  └── routes.js
```

In this structure, the `Login.vue` file is located in the `pages` folder. The other files are organized into their respective folders based on their functionality.

## Dashboard.vue

First, let's create a function to fetch the shopping malls data from the Notion database. Create a new file `src/api/malls.ts`:

```ts
// src/api/malls.ts
import { notionClient } from '@/utils/notionClientSingleton';

interface Mall {
  id: string;
  mallName: string;
  openingPrompt: string;
  Url: string;
  imageUrl: string;
  mallLogo: string;
  userIcon: string;
  latitude: string;
  longitude: string;
}

export const fetchMalls = async (): Promise<Mall[]> => {
  const response = await notionClient.databases.query({
    database_id: process.env.NOTION_MALLS_DATABASE_ID,
  });

  return response.results.map((page) => {
    return {
      id: page.id,
      mallName: page.properties['Mall Name'].title[0]?.plain_text,
      openingPrompt: page.properties['Opening Prompt'].rich_text[0]?.plain_text,
      subDomain: page.properties['URL'].url,
      posterUrl: page.properties['Poster'].files[0]?.external.url,
      mallLogo: page.properties['Mall Logo'].files[0]?.external.url,
      userIcon: page.properties['User Icon'].files[0]?.external.url,
      latitude: page.properties['Latitude'].rich_text[0]?.plain_text,
      longitude: page.properties['Longitude'].rich_text[0]?.plain_text
    };
  });
};
```

In this TypeScript version of `src/api/malls.ts`, we define an interface `Mall` to represent the structure of a mall object. The `fetchMalls` function now has a return type of `Promise<Mall[]>`, which indicates that it returns a promise that resolves to an array of `Mall` objects.