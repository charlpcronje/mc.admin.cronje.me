# Creating a store
Stores are created in a `stores/` directory, and defined by using Pinia's `defineStore` method.

In this example, we have created a store (`useCounterStore`) and given the store a name (`counter`). We have then defined our `state` property (`count`) with an initial value.

```ts
// stores/counter.ts

import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
})
```

## Using the store

Pinia offers a few ways to access the store and maintain reactivity.

---
created: 2023-05-25T02:57:41 (UTC +02:00)
tags: []
source: https://dev.to/tao/adding-pinia-to-nuxt-3-2023-3l77
author: 
---

# Adding Pinia to Nuxt 3 🍍 (2023) - DEV Community

> ## Excerpt
> Getting started with Pinia for global state management.

---
### 1\. Store instance

In your component's `setup()`, import the store's `useStore()` method.  

```ts
// components/MyCounter.vue

import { useCounterStore } from '@/stores/counter'

export default defineComponent({
  setup() {
    return {
      store: useCounterStore(),
    }
  },
})
```

Enter fullscreen mode Exit fullscreen mode

You can now access state through the store instance:  

```vue
// components/MyCounter.vue

<template>
  <p>Counter: {{ store.count }}</p>
</template>
```

Enter full screen mode Exit fullscreen mode

### 2. Computed properties

To write cleaner code, you may wish to grab specific properties. However, destructuring the store will break reactivity.

Instead, we can use a computed property to achieve reactivity:  

```ts
// components/MyCounter.vue

export default defineComponent({
  setup() {
    const store = useCounterStore()

    // ❌ Bad (unreactive):
    const { count } = store

    // ✔️ Good:
    const count = computed(() => store.count)

    return { count }
  },
})
```

Enter fullscreen mode Exit fullscreen mode

```vue
// components/MyCounter.vue

<template>
  <p>Counter: {{ store.count }}</p>
</template>
```

Enter fullscreen mode Exit fullscreen mode

### [](https://dev.to/tao/adding-pinia-to-nuxt-3-2023-3l77#3-extract-via-storetorefs)3\. Extract via storeToRefs()

You can destructure properties from the store while keeping reactivity through the use of `storeToRefs()`.

This will create a ref for each reactive property.  

```ts
// components/MyCounter.vue
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

export default defineComponent({
  setup() {
    const store = useCounterStore()

    // ❌ Bad (unreactive):
    const { count } = store

    // ✔️ Good:
    const { count } = storeToRefs(store)

    return { count }
  },
})
```

Enter fullscreen mode Exit fullscreen mode

```vue
// components/MyCounter.vue

<template>
  <p>Counter: {{ store.count }}</p>
</template>
```

Enter fullscreen mode Exit fullscreen mode

## Actions

### Adding an action

Actions are the equivalent of `methods` in components, defined in the store's `actions` property.  

```ts
// stores/counter.ts

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++
    },
  },
})
```

### Using an action

In your component, extract the action from the store.  

```ts
// components/MyCounter.vue

export default defineComponent({
  setup() {
    const store = useCounterStore()
    const { increment } = store
    const count = computed(() => store.count)
    return { increment, count }
  },
})
```

The action can easily be invoked, such as upon a button being clicked:  

```vue
// components/MyCounter.vue

<template>
  <button type="button" @click="increment"></button>
</template>
```

## Getters

Getters are the equivalent of `computed` in components, defined in the store's `getters` property.

### Adding a getter

Pinia encourages the usage of the arrow function, using the state as the first parameter:  

```ts
// stores/counter.ts

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    getCount: (state) => state.count,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

### Using a getter

Similarly to state properties, getters need to be accessed in a way that maintains reactivity.

For instance, you could access it through the store instance:  

```ts
// components/MyCounter.vue

export default defineComponent({
  setup() {
    const store = useCounterStore()
    return { store }
  },
})
```

```vue
// components/MyCounter.vue

<template>
  <p>Counter: {{ store.getCount }}</p>
</template>
```

Or, by using a computed property:  

```ts
// components/MyCounter.vue

export default defineComponent({
  setup() {
    const store = useCounterStore()

    // ❌ Bad (unreactive):
    const { getCount } = store

    // ✔️ Good:
    const getCount = computed(() => store.getCount)

    return { getCount }
  },
})
```

```vue
// components/MyCounter.vue

<template>
  <p>Counter: {{ getCount }}</p>
</template>
```

Or, by using `storeToRefs()`:  

```ts
// components/MyCounter.vue
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

export default defineComponent({
  setup() {
    const store = useCounterStore()

    // ❌ Bad (unreactive):
    const { getCount } = store

    // ✔️ Good:
    const { getCount } = storeToRefs(store)

    return { getCount }
  },
})
```

```vue
// components/MyCounter.vue

<template>
  <p>Counter: {{ getCount }}</p>
</template>
```

## A complete component

Since we've discussed actions and getters separately, here is a code snippet that combines both in the style that I recommend:  

```ts
// components/MyCounter.vue

import { useCounterStore } from '@/stores/counter'

export default defineComponent({
  setup() {
    const store = useCounterStore()
    const getCount = computed(() => store.getCount)
    const { increment } = store
    return { getCount, increment }
  },
})
```

Enter fullscreen mode Exit fullscreen mode

```vue
// components/MyCounter.vue

<template>
  <p>Counter: {{ getCount }}</p>
  <button type="button" @click="increment">Increment</button>
</template>
```

This code has been implemented at [lloydtao/nuxt-3-starter/](https://github.com/lloydtao/nuxt-3-starter/):

