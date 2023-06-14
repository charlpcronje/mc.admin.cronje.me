
# [Element Plus Nuxt](https://nuxt.com/modules/element-plus#element-plus-nuxt)

> [Element Plus](https://element-plus.org) module for [Nuxt](https://nuxt.com)

## [Features](https://nuxt.com/modules/element-plus#features)

-   Automatically import components and styles on demand.
-   Automatically import directives and styles on demand.
-   Automatically import icons from [@element-plus/icons-vue](https://github.com/element-plus/element-plus-icons).
-   Automatically import of ElMessage, ElNotification and other methods.
-   Automatically inject the ID\_INJECTION\_KEY into Vue.
-   Automatically inject the teleport markup into the correct location in the final page HTML.

## [Installation](https://nuxt.com/modules/element-plus#installation)

```sh
npm i element-plus @element-plus/nuxt -D
```

```ts
export default defineNuxtConfig({
  modules: [
    '@element-plus/nuxt'
  ],
  elementPlus: { /** Options */ }
})
```

## [Usage](https://nuxt.com/modules/element-plus#usage)

```vue
<template>
  <el-button @click="ElMessage('hello')">button</el-button>
  <ElButton :icon="ElIconEditPen" type="success">button</ElButton>
  <LazyElButton type="warning">lazy button</LazyElButton>
</template>
```

Reference [Nuxt documentation](https://nuxt.com/docs/guide/directory-structure/components) and [playground](https://nuxt.com/modules/playground/app.vue) use.

## [Options](https://nuxt.com/modules/element-plus#options)

### [importStyle](https://nuxt.com/modules/element-plus#importstyle)

-   Type: `'css' | 'scss' | boolean`
-   Default: `css`

import style css or sass(scss) with components, disable automatically import styles with `false`.

### [themes](https://nuxt.com/modules/element-plus#themes)

-   Type: `array`

A list of themes that require import styles automatically.

e.g. `['dark']`

### [icon](https://nuxt.com/modules/element-plus#icon)

-   Type: `string | false`
-   Default: `ElIcon`

Icon prefix name, disable automatically import icon with `false`.

### [namespace](https://nuxt.com/modules/element-plus#namespace)

-   Type: `string`
-   Default: `el`

When you change the global namespace, you must change it here as well.

### [injectionID](https://nuxt.com/modules/element-plus#injectionid)

-   Type: `object`
-   Default: `{ prefix: 1024, current: 0 }`

Automatically inject the ID\_INJECTION\_KEY into Vue.

### [appendTo](https://nuxt.com/modules/element-plus#appendto)

-   Type: `array`

When you modify the `append-to` props in all based on ElTooltip components, you need to add the value here.

### [components](https://nuxt.com/modules/element-plus#components)

-   Type: `array`

If there are components that are not imported automatically from Element Plus, you need to add the component name here.

e.g. `['ElSubMenu']`

### [subComponents](https://nuxt.com/modules/element-plus#subcomponents)

-   Type: `object`

A map of components that the definition file of subComponent is in its parent component.

### [directives](https://nuxt.com/modules/element-plus#directives)

-   Type: `object`

If there are directives that are not imported automatically from Element Plus, you need to add the directive name here.

### [imports](https://nuxt.com/modules/element-plus#imports)

-   Type: `array`

If you wish to add automatically import content from Element Plus, you can add it here.

### [noStylesComponents](https://nuxt.com/modules/element-plus#nostylescomponents)

-   Type: `array`

When a component incorrectly loads styles, you need to add the component name here.

### [include](https://nuxt.com/modules/element-plus#include)

-   Type: `array`
-   Default: `[ /\.vue$/, /\.vue\?vue/, /\.vue\?v=/, /\.((c|m)?j|t)sx?$/]`

Include files that need to automatically import styles.

### [exclude](https://nuxt.com/modules/element-plus#exclude)

-   Type: `array`
-   Default: `[/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/]`

Exclude files that do not require the automatic import of styles.

## [Template](https://nuxt.com/modules/element-plus#template)

[element-plus-nuxt-starter](https://github.com/element-plus/element-plus-nuxt-starter)

## [Development](https://nuxt.com/modules/element-plus#development)

-   Run `pnpm i` to install the dependencies.
-   Run `pnpm dev:prepare` to generate type stubs.
-   Run `pnpm dev` to start playground in development mode.
-   Run `pnpm dev:build` to build playground.
-   Run `pnpm dev:start` to locally preview playground.
-   Run `pnpm build` to build this project.
