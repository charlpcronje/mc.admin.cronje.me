# [Nuxt Icon](https://nuxt.com/modules/icon#nuxt-icon)

## [Features ✨](https://nuxt.com/modules/icon#features)

-   Nuxt 3 ready
-   Support 100,000 open source vector icons via [Iconify](https://iconify.design)
-   Emoji Support
-   Custom SVG support (via Vue component)

## [Setup ⛓️](https://nuxt.com/modules/icon#setup-️)

Add `nuxt-icon` dependency to your project:

```bash
npm install --save-dev nuxt-icon

# Using yarn
yarn add --dev nuxt-icon
```

Add it to the `modules` array in your `nuxt.config.ts`:

```sh
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['nuxt-icon']
})
```

That's it, you can now use the `<Icon />` in your components!

✨ If you are using VS Code, you can use the [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)
## [Usage 👌](https://nuxt.com/modules/icon#usage)

**Props:**

-   `name` (required): icon name, emoji or global component name
-   `size`: icon size (default: `1em`)

**Attributes**:

When using an icon from Iconify, an `<svg>` will be created, you can give [all the attributes](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute) of the native element.

```vue
<Icon name="uil:github" color="black" />
```

### [Iconify dataset](https://nuxt.com/modules/icon#iconify-dataset)

You can use any name from the [https://icones.js.org](https://icones.js.org) collection:

```vue
<Icon name="uil:github" />
```

### [Emoji](https://nuxt.com/modules/icon#emoji)

```vue
<Icon name="🚀" />
```

### [Vue component](https://nuxt.com/modules/icon#vue-component)

```vue
<Icon name="NuxtIcon" />
```

Note that `NuxtIcon` needs to be inside `components/global/` folder (see [example](https://github.com/nuxt-modules/icon/blob/main/playground/components/global/NuxtIcon.vue)).

## [Configuration ⚙️](https://nuxt.com/modules/icon#configuration-️)

To update the default size (`1em`) of the `<Icon />`, create an `app.config.ts` with the `nuxtIcon.size` property.

Update the default class (`.icon`) of the `<Icon />` with the `nuxtIcon.class` property, for a headless Icon, simply set `nuxtIcon.class: ''`.

You can also define aliases to make swapping out icons easier by leveraging the `nuxtIcon.aliases` property.

```ts
// app.config.ts
export default defineAppConfig({
  nuxtIcon: {
    size: '24px', // default <Icon> size applied
    class: 'icon', // default <Icon> class applied
    aliases: {
      'nuxt': 'logos:nuxt-icon',
    }
  }
})
```

The icons will have the default size of `24px` and the `nuxt` icon will be available:

```vue
<Icon name="nuxt" />
```

## [Render Function](https://nuxt.com/modules/icon#render-function)

You can use the `Icon` component in a render function (useful if you create a functional component), for this you can import it from `#components`:

```ts
import { Icon } from '#components'
```
See an example of a `<MyIcon>` component:

```vue
<script setup>
import { Icon } from '#components'

const MyIcon = h(Icon, { name: 'uil:twitter' })
</script>

<template>
  <p><MyIcon /></p>
</template>
```

## [CSS Icons](https://nuxt.com/modules/icon#css-icons)

This is currently experimental and may change in the future, this is a way to use CSS icons instead of SVG icons to reduce the DOM size and improve performance. It is leveraging the Mask combined with background color set to `currentColor`, useful to render monotone icons that use `currentColor` as icon color. Learn more on [https://docs.iconify.design/icon-components/css.html](https://docs.iconify.design/icon-components/css.html)

```vue
<template>
  <IconCSS name="uil:twitter" />
</template>
```

You can use aliases in `<IconCSS>` as well.

Note that CSS Masks have limited support, see [https://caniuse.com/css-masks](https://caniuse.com/css-masks) for more information.

Also, the icons won't be loaded on initial load and an HTTP request will be made to Iconify CDN to load them.
