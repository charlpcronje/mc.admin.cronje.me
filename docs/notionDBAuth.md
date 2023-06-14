# Custom Authentication with Notion and Cookies

To do authentication with a Notion database we can use the following example Database structure

`Users` Table
- Status (checkbox)
- ID (Formula id())
- Avatar (File)
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

npm install @types/cookie-signature @notionhq/client bcryptjs cookie-signature 
```
- Create a `auth.ts` file in the `plugins` folder

### 6.1 Plugins

```ts
//auth.ts
export default defineNuxtPlugin(async () => {
    const { me } = useAuth();

    await me();
});
```

### 6.2 Middleware

For Middleware I created 3 files:
- admin-only.ts
- guest-only.ts
- user-only.ts

```ts
// admin-only.ts
export default defineNuxtRouteMiddleware(async () => {
    const isAdmin = useAdmin();

    if (!isAdmin.value) return navigateTo({ name: "login" });
});
```

```ts
// guest-only.ts
export default defineNuxtRouteMiddleware(async () => {
    const user = useAuthUser();

    if (user.value) {
        if (process.server) return navigateTo({ name: "index" });

        return abortNavigation();
    }
});

```

```ts
// user-only.ts
export default defineNuxtRouteMiddleware(async () => {
    const user = useAuthUser();

    if (!user.value) return navigateTo({ name: "login" });
});
```

### 6.3 Components

```vue
// loginPage.vue
<script lang="ts" setup>
const emit = defineEmits(["success"]);
const { login } = useAuth();
const form = reactive({
    data: {
		avatar: "/img/avatars/defaultAvatar.png",
        email: "charl@cronje.me",
        password: "9983538",
        rememberMe: true,
		roles: [],
		company: "Private"
    },
    error: "",
    pending: false,
});

async function onLoginClick() {
    try {
        form.error = "";
        form.pending = true;
        await login(form.data.email,form.data.password,form.data.rememberMe);
        emit("success");
    } catch (error: any) {
        if (error.data.message) form.error = error.data.message;
    } finally {
        form.pending = false;
    }
}
</script>

<template>
	<p v-if="form.error" class="mb-3 text-red-500">
        {{ form.error }}
    </p>
	<div class="max-w-2xl mx-auto">
		<div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
			<form 
			class="space-y-6" 
			@submit.prevent="onLoginClick">
				<h3 class="text-xl font-medium text-gray-900 dark:text-white">
					Sign in to Mall Chat Admin
				</h3>
				<div>
					<button>Email and Password</button>
				</div>
				<div>
					<label for="email" class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your
						email
					</label>
					<input 
						v-model="form.data.email" 
						type="email" 
						name="email" 
						id="email"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						placeholder="name@company.com" 
						required="true"
					/>
				</div>
				<div>
					<label for="password" class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your
						password
					</label>
					<input 
						v-model="form.data.password" 
						type="password" 
						name="password" 
						id="password" 
						placeholder="••••••••"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						required="true"
					/>
				</div>
				<div class="flex items-start">
					<div class="flex items-start">
						<div class="flex items-center h-5">
							<input 
								id="remember" 
								v-model="form.data.rememberMe" 
								aria-describedby="remember" 
								type="checkbox"
								class="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
							/>
						</div>
						<div class="text-sm ml-3">
							<label for="remember" class="font-medium text-gray-900 dark:text-gray-300">
								Remember me
							</label>
						</div>
					</div>
					<a href="#" class="text-sm text-blue-700 hover:underline ml-auto dark:text-blue-500">
						Lost Password?
					</a>
				</div>
				<button 
					type="submit"
          :disabled="form.pending"
					class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Sign In
				</button>
				<!--
				<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
				Not registered? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create
				account</a>
				</div>
				-->
			</form>
		</div>


		<p class="mt-5">
			There are no new registrations available right now
			<br />
			<a href="/contactUs" class="text-blue-600 hover:underline">
				Contact Us
			</a>
		</p>
	</div>
</template>
```

### 6.4 Composables

The following Composables

- `/composables/auth.ts`

```ts
export { useAuthUser } from "./auth/useAuthUser";
export { useAuth } from "./auth/useAuth";
export { useAdmin } from "./auth/useAdmin";
```

- `/composables/auth/useAuth.ts`

```ts
// useAuth.ts
import { useAuthUser } from "./useAuthUser";
import type { User } from "~~/types";

export const useAuth = () => {
    const authUser = useAuthUser();

    const setUser = (user: User | null) => {
        authUser.value = user;
    };

    const setCookie = (cookie: any) => {
        cookie.value = cookie;
    };

    const login = async (email: string, password: string, rememberMe: boolean) => {
        const data:any = await $fetch("/auth/login", {
            method: "POST",
            body: {
                email,
                password,
                rememberMe,
            },
        });

        setUser(data.user);
        return authUser;
    };

    const logout = async () => {
        const data = await $fetch("/auth/logout", {
            method: "POST",
        });

        setUser(data.user);
    };

    const me = async () => {
        if (!authUser.value) {
            try {
                const data:any = await $fetch("/auth/me", {
                    headers: useRequestHeaders(["cookie"]) as HeadersInit,
                });

                setUser(data.user);
            } catch (error) {
                setCookie(null);
            }
        }

        return authUser;
    };

    return {
        login,
        logout,
        me
    };
};

```

- `/composables/auth/useAdmin.ts`

```ts
// useAdmin.ts

export const useAdmin = () => {
    const authUser = useAuthUser();

    return computed(() => {
        if (!authUser.value) return false;

        return authUser.value.roles.includes("Admin");
    });
};
```

- `/composables/auth/useAuthUser.ts`

```ts
// useAuthUser.ts`
import type { UserWithoutPassword } from "~~/types";

export const useAuthUser = () => {
    return useState<UserWithoutPassword | null>("user", () => null);
};

```

### 6.5 Pages

- Create a `login.vue` file in the `pages` folder

```vue
<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle :text="$t('pages.login.title')" class="capitalize" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <LoginPage @success="onLoginSuccess"/>  
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>

<script lang="ts" setup>
import { capitalize } from '~/utils/str'
import LoginPage from '@/components/LoginPage.vue'
// composable
const { t } = useLang()

// compiler macro
definePageMeta({
  layout: 'page',
  middleware: ["guest-only"]
})

useHead(() => ({
  title: capitalize(t('pages.login.title')),
  meta: [
    {
      name: 'description',
      content: t('pages.login.description'),
    },
  ],
}))

const currentUser = useAuthUser();
const isAdmin = useAdmin();



async function onLoginSuccess() {
    const redirect = isAdmin.value ? "/admin" : "/private";

    await navigateTo(redirect);
}
</script>
```

### 6.6 Protecting routes

Here is an example of a page that can only be accessed by the `Admin` user

Specifically have a look at `definePageMeta ` and `middleware: ["admin-only"]`

```vue
// admin.vue
<script lang="ts" setup>
import { capitalize } from '~/utils/str'

// composable
const { t } = useLang()
definePageMeta({
    middleware: ["admin-only"],
});

// compiler macro
definePageMeta({
    layout: 'dashboard',
})
useHead(() => ({
    title: capitalize(t('pages.admin.title')),
    meta: [{
        name: 'description',
        content: t('pages.admin.description'),
    }]
}));

const { data: users } = await useAsyncData("users", () =>
    $fetch("/api/users",{
        headers: useRequestHeaders(["cookie"]) as HeadersInit
    })
);
const currentUser = useAuthUser();
</script>

<template>
    <PageWrapper>
        <PageHeader>
            <PageTitle :text="$t('pages.admin.title')+':'+' '+currentUser.fullName" class="capitalize" />
        </PageHeader>
        <PageBody>
            <PageSection>
                <!--
                <PageUser :user="currentUser"/>
                -->
                <div class="mb-3 p-3 text-light-100 shadow-lg shadow-black/20 dark:shadow-black/40">
                    <p class="text-lg text-weight-800">Users</p>
                    <table class="min-w-full text-left text-sm font-light">
                        <thead class="border-b font-medium dark:border-neutral-500">
                            <tr class="table-row">
                                <th scope="col" class="px-1 py-1"></th>
                                <th scope="col" class="px-1 py-1" style="width:20px">Status</th>
                                <th scope="col" class="px-6 py-4">Full Name</th>
                                <th scope="col" class="px-6 py-4">Email Address</th>
                                <th scope="col" class="px-6 py-4">Roles</th>
                            </tr>
                        </thead>
                        <tbody class="table-row-group">
                            <tr v-for="user in users" :key="user.id" class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                <td class="whitespace-nowrap px-1 py-1 font-medium"><img style="height:30px" :src="user.avatar"/></td>
                                <td class="whitespace-nowrap px-1 py-1" style="width:20px"><input type="checkbox" :checked="user.status" disabled/></td>
                                <td class="whitespace-nowrap px-6 py-4">{{ user.fullName }}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{ user.email }}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{ user.roles.join(',') }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </PageSection>
        </PageBody>
    </PageWrapper>
</template>
```

### 6.7 Protecting API routes

There some more files in the `server/api` folder that you can use to protect your API routes

- login.post.ts
- notion.js


### 6.8 Server Middleware

`/server/middleware/session.ts`

```ts
// session.ts
export default defineEventHandler(async (event) => {
    const user = await getUserFromSession(event);

    if (user) event.context.user = user;
});
```

### 6.8 Server Models

- `/server/models/user.ts`

```ts
// user.ts
import { Client } from "@notionhq/client";
import type { NotionApiResponse, User } from "~~/types";
import { mapNotionApiResponseToUser } from "~/utils/notion/mapUsers";
import { AnyAaaaRecord } from "dns";

const notion = new Client({ auth: process.env.NOTION_API_KEY! });
const DB = process.env.NOTION_USERS_DB!;

export async function getUsers() {
    
    const userData = await notion.databases.query({
        database_id: DB
    });
    return mapNotionApiResponseToUser(userData);
}


export async function getUserByEmail(email: string) {
    const data:any = await notion.databases.query({
        database_id: DB,
        filter: {
            property: 'Email Address',
            rich_text: {
                equals: email,
            },
        },
    });
    return mapNotionApiResponseToUser(data)[0];
}

export async function getUserByEmailAndPassword(email: string, password:string):Promise<User> {
    const data:any = await notion.databases.query({
        database_id: DB,
        filter: {
            and: [{
                    property: 'Email Address',
                    rich_text: {
                        equals: email,
                    },
                },{
                    property: 'Password',
                    rich_text: {
                        equals: password,
                    },
                },
            ],
        }
    });
    
    return mapNotionApiResponseToUser(data.results)[0];
}

export async function getUserById(id: number) {
    const data:any = await notion.databases.query({
        database_id: DB,
        filter: {
            property: 'ID',
            number: {
                equals: id,
            },
        },
    });
    return mapNotionApiResponseToUser(data.results)[0];
}

export async function isAdmin(user?: User) {
    return user && user.roles.includes("Admin");
}
```

### 6.9 Server Routes

- `/server/routes/auth/login.post.ts`

```ts
// login.post.ts
import { getUserByEmailAndPassword } from "~~/server/models/user";

export default defineEventHandler(async (event) => {
    const body = await readBody<{ email: string; password: string; rememberMe: boolean }>(event);

    const { email, password, rememberMe } = body;

    if (!email || !password) {
        return createError({
            statusCode: 400,
            message: "Email address and password are required",
        });
    }

    const userWithPassword = await getUserByEmailAndPassword(email,password);
    
    if (!userWithPassword) {
        return createError({
            statusCode: 401,
            message: "Bad credentials"
        });
    }

    if (!userWithPassword.status) {
        return createError({
            statusCode: 401,
            message: "User Deactivated"
        });
    }

    /* When passwords will be encrypted for now the 
    password is verified by filtering on email and password from notion
    const verified = await verify(password, userWithPassword.password);

    if (!verified || userWithPassword) {
        return createError({
            statusCode: 401,
            message: "Bad credentials",
        });
    }
    */
    const config = useRuntimeConfig();

    const session = serialize({ userId: userWithPassword.id });
    const signedSession = sign(session, config.cookieSecret);

    setCookie(event, config.cookieName, signedSession, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        expires: rememberMe
            ? new Date(Date.now() + config.cookieRememberMeExpires)
            : new Date(Date.now() + config.cookieExpires),
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = userWithPassword;

    return {
        user: userWithoutPassword,
    };
});
```

- `/server/routes/auth/logout.post.ts`

```ts
// logout.post.ts
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    deleteCookie(event, config.cookieName, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    });

    return {
        user: null,
    };
});
```

- `/server/routes/auth/me.get.ts`

```ts
// me.get.ts
export default defineEventHandler(async (event) => {
    const userWithPassword = event.context.user;

    if (!userWithPassword) {
        return {
            user: null,
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = userWithPassword;

    return {
        user: userWithoutPassword,
    };
});
```

### 6.10 Server Utils

- `/server/utils/password.ts`

```ts
// password.ts
import bcrypt from "bcryptjs";

export async function hash(plainPassword: string) {
    return bcrypt.hash(plainPassword, 10);
}

export function verify(plainPassword: string, hash: string) {
    return bcrypt.compare(plainPassword, hash);
}

```

- `/server/utils/session.ts`

```ts
// session.ts
import type { H3Event } from "h3";
import cookieSignature from "cookie-signature";
import { getUserById } from "~~/server/models/user";

export function serialize(obj: any) {
    const value = Buffer.from(JSON.stringify(obj), "utf-8").toString("base64");
    const length = Buffer.byteLength(value);

    if (length > 4096) throw new Error("Session value is too long");

    return value;
}

export function deserialize(value: string) {
    return JSON.parse(Buffer.from(value, "base64").toString("utf-8"));
}

export function sign(value: string, secret: string) {
    return cookieSignature.sign(value, secret);
}

export function unsign(value: string, secret: string) {
    return cookieSignature.unsign(value, secret);
}

export async function getUserFromSession(event: H3Event) {
    const config = useRuntimeConfig();

    const cookie = getCookie(event, config.cookieName);
    
    if (!cookie) return null;

    const unsignedSession = unsign(cookie, config.cookieSecret);
    if (!unsignedSession) return null;

    const session = deserialize(unsignedSession);
    return await getUserById(session.userId);

}
```

### 6.11 Server Utils

- Service
- `/services/notion.ts`

```ts
const notionApiOptions = {
  baseURL: 'https://api.notion.com/v1',
  headers: {
    Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
    'Notion-Version': '2021-08-16', // Replace with the desired Notion API version
  },
}

export function useNotionDatabase(databaseId) {
  const { data: results = [], loading, error } = useFetch(`/databases/${databaseId}/query`, notionApiOptions)
  const resultss = data.results || []
  return {
    resultss,
    loading,
    error,
  }
}
```