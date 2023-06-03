# Authentication with Nuxt DB and JWT

To do authentication with a Notion database we can use the following example Database structure

`Users` Table
- ID (Formula id())
- Full Name (String)
- Email Address (Email)
- Password (String)
- Company (Relation to Companies Table)
- Role (Multi-Select)

For the `Companies` Database we have the following Columns:
- ID (Formula id())
- Company Name
- Description
- Email
- Contact Number
- Contact Person


## Outline

1. Set up Notion API and get the API key.
2. Install the required packages for your Nuxt 3 application.
3. Create a Pinia store for state management.
4. Implement JWT authentication.

First, set up the Notion API by following the official guide: https://developers.notion.com/docs/getting-started

## Installation

Next, install the required packages for your Nuxt 3 application:

```sh
npm install @nuxtjs/axios @nuxtjs/auth-next @notionhq/client pinia
```

Now, create a Pinia store for state management. In your `src` folder, create a folder named `store` and inside it, create a file named `user.ts`:

```ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
  },
});
```

Next, implement JWT authentication. First, configure the `auth` module in your `nuxt.config.js`:

```ts
export default {
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer',
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: { url: '/api/login', method: 'post' },
          logout: false,
          user: false,
        },
      },
    },
  },
};
```

Create an API route for login in your Nuxt 3 application. In your `src` folder, create a folder named `api` and inside it, create a file named `login.ts`:

```ts
import { defineNuxtPlugin } from 'nuxt3';
import { Client } from '@notionhq/client';
import jwt from 'jsonwebtoken';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.app.use('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Fetch users from the Notion Users database
    const users = await notion.databases.query({
      database_id: process.env.NOTION_USERS_DATABASE_ID,
    });

    // Find the user with the provided email and password
    const user = users.results.find(
      (u) =>
        u.properties['Email Address'].email === email &&
        u.properties.Password.rich_text[0].plain_text === password
    );

    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, user });
  });
});
```

In your login component, use the `loginWith` method to authenticate the user:

```ts
import { useAuth } from '@nuxtjs/auth-next';
import { useUserStore } from '~/store/user';

async function login() {
  const auth = useAuth();
  const userStore = useUserStore();

  try {
    await auth.loginWith('local', {
      data: {
        email: this.email,
        password: this.password,
      },
    });

    userStore.setUser(auth.user);
  } catch (error) {
    console.error('Login failed:', error);
  }
}
```

You don't need to create another database in Notion to save the tokens. JWT tokens can be stored in the client's browser using cookies or localStorage. The `@nuxtjs/auth-next` module handles this for you.

## Error handling & Validation

To implement proper error handling and validation for user input, you can use a library like `yup` for schema validation. First, install `yup`:

```sh
npm install yup
```

Next, create a validation schema for the login input in your login component:


```ts
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});
```

Now, update the `login` function in your login component to validate the input before sending the request:

```ts
import { useAuth } from '@nuxtjs/auth-next';
import { useUserStore } from '~/store/user';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

async function login() {
  const auth = useAuth();
  const userStore = useUserStore();

  try {
    // Validate user input
    await loginSchema.validate({
      email: this.email,
      password: this.password,
    });

    await auth.loginWith('local', {
      data: {
        email: this.email,
        password: this.password,
      },
    });

    userStore.setUser(auth.user);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      console.error('Validation error:', error.message);
    } else {
      console.error('Login failed:', error);
    }
  }
}
```

This will ensure that the user input is validated before sending the login request. If the input is invalid, a `yup.ValidationError` will be thrown, and you can display the error message to the user.
I'm done with implementing error handling and validation for user input using `yup`.

## Further improvement

We can use a Singleton pattern for the Notion Client to ensure that only one instance of the client is created throughout your application. To do this, create a separate file for the Notion Client Singleton, for example: `notionClient.ts`

```ts
import { Client } from '@notionhq/client';

class NotionClientSingleton {
  private static instance: Client;

  private constructor() {
    // Private constructor to prevent instantiation from outside
  }

  public static getInstance(): Client {
    if (!NotionClientSingleton.instance) {
      NotionClientSingleton.instance = new Client({
        auth: process.env.NOTION_API_KEY,
      });
    }
    return NotionClientSingleton.instance;
  }
}

export default NotionClientSingleton;
```

Now, whenever you need to use the Notion Client in your application, you can import the Singleton and get the instance:

```ts
import NotionClientSingleton from '~/notionClient';

const notion = NotionClientSingleton.getInstance();
```

By using the Singleton pattern, you ensure that only one instance of the Notion Client is created and used throughout your application, which can help with resource management and consistency.

You can create the `notionClient.ts` file in a dedicated folder for services or utilities within your project. For example, you can create a folder named `services` or `utils` in the root of your project directory, and then create the `notionClient.ts` file inside that folder.
Here's an example of the project structure:

```
project-root/
  ├── src/
  │   ├── components/
  │   ├── layouts/
  │   ├── pages/
  │   └── store/
  ├── services/
  │   └── notionClient.ts
  ├── nuxt.config.js
  ├── package.json
  └── tsconfig.json
```

By placing the `notionClient.ts` file in a dedicated folder, you keep your project organized and make it easier to manage and maintain your code.