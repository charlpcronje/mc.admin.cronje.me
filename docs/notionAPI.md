# Notion API

Here are some useful code snippets to get started with the Notion API

To use TypeScript with the Notion API and Nuxt 3, you can follow these steps:

1. Create a new Nuxt 3 application with TypeScript:

```bash
npx create-nuxt-app my-nuxt3-app
cd my-nuxt3-app
```

2. Install the required dependencies:

```bash
npm install @notionhq/client
```

3. Create a `.env` file in the root of your project with your Notion API key:

```ini
NOTION_API_KEY=your_notion_api_key
```

4. Update your `nuxt.config.ts` file to include the `dotenv` module and the environment variables:

```typescript
import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  modules: ['@nuxtjs/dotenv'],
  publicRuntimeConfig: {
    notionApiKey: process.env.NOTION_API_KEY,
  },
})
```

5. Create a new file `plugins/notion.ts` to initialize the Notion client:

```typescript
import { Client } from '@notionhq/client'
import { NuxtApp } from '@nuxt/types'

export default function (nuxt: NuxtApp) {
  const notion = new Client({
    auth: nuxt.$config.notionApiKey,
  })

  nuxt.provide('notion', notion)
}
```

6. Update your `nuxt.config.ts` file to include the Notion plugin:

```typescript
import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  runtimeConfig: {
    notionApiKey: process.env.NOTION_API_KEY,
  },
  plugins: ['~/plugins/notion.ts'],
})
```

7. Create a new file `services/notion.ts` to include the functions to interact with the Notion API:

```typescript
import { Client } from '@notionhq/client'

interface Person {
  id: number
  firstName: string
  lastName: string
  registered: boolean
}

export async function getDatabase(
  databaseId: string,
  notion: Client
): Promise<any> {
  const response = await notion.databases.retrieve({ database_id: databaseId })
  return response
}

export async function authenticateUser(
  email: string,
  databaseId: string,
  notion: Client
): Promise<Person | null> {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'email',
      text: {
        equals: email,
      },
    },
  })

  return response.results.length > 0 ? response.results[0] : null
}
```

8. In your Nuxt 3 pages or components, you can now use the Notion client to authenticate users:

```html
<template>
  <div>
    <input v-model="email" type="email" placeholder="Email" />
    <button @click="login">Login</button>
    <div v-if="user">
      <h3>User Information</h3>
      <p>Name: {{ user.title }}</p>
      <p>Email: {{ user.properties.email.rich_text[0].plain_text }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useNuxt } from '@nuxtjs/composition-api'
import { authenticateUser, getDatabase } from '~/services/notion'

interface Person {
  id: number
  firstName: string
  lastName: string
  registered: boolean
}

export default defineComponent({
  setup() {
    const nuxt = useNuxt()
    const notion = nuxt.notion
    const email = ref('')
    const user = ref<Person | null>(null)

    async function login() {
      const databaseId = 'your_database_id'
      user.value = await authenticateUser(email.value, databaseId, notion)
    }

    return { email, user, login }
  },
})
</script>
```

Make sure to replace `'your_database_id'` with the actual ID of your Notion database.

With these steps, you have set up a Nuxt 3 application with TypeScript that authenticates users using the Notion API.

Sources:
- [Source 2](https://blog.logrocket.com/scaffolding-app-vue-3-nuxt-typescript/)
- [Source 3](https://www.vuemastery.com/blog/api-management-in-nuxt-3-with-typescript/)

## Referencing a Notion database and column types

To reference a multi-select value in Notion using TypeScript, you can use the `Relation` type provided by the Notion API. First, you need to define the relation type in your TypeScript code by specifying the property type as `Relation` and providing the related database ID.

Here's an example of how to reference a multi-select value from a related table in TypeScript:

```typescript
import { Client, Relation } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;
const relationId = process.env.NOTION_RELATION_ID;

(async () => {
  // Retrieve the related database object
  const relatedDatabase = await notion.databases.retrieve(relationId);

  // Retrieve the first database object
  const firstDatabase = await notion.databases.retrieve(databaseId);

  // Access the multi-select column in the first database
  const multiSelectColumn = firstDatabase.properties.multiSelectColumn;

  // Retrieve the related page object
  const relatedPage = await notion.pages.retrieve(multiSelectColumn.relation[0].page_id);

  // Access the multi-select values
  const multiSelectValues = relatedPage.properties.multiSelectColumnName;

  console.log(`Multi-select Values: ${multiSelectValues}`);
})();
```

Replace `databaseId`, `relationId`, `multiSelectColumn`, and `multiSelectColumnName` with the appropriate values for your use case.

Keep in mind that when using the `Relation` type in TypeScript, you may need to handle multi-select values properly by converting them into an array of strings.

Sources:

- [Source 5](https://www.reddit.com/r/Notion/comments/nw3qfg/getting_notion_to_map_multiselect_items_in_api/)
- [Source 13](https://www.redgregory.com/notion/2019/12/3/the-difference-between-select-and-multi-select-in-notion) 