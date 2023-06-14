# [nuxt-viewport](https://nuxt.com/modules/nuxt-viewport#nuxt-viewport)

> Define custom viewports for your [Nuxt](https://v3.nuxtjs.org/)️ project

## [Features](https://nuxt.com/modules/nuxt-viewport#features)

-   ⚡️  Fast & Light with [MatchMedia API](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) ⚡️
-   🕶  Auto detects the device viewport from Cookie & User-Agent
-   👌  Zero configuration to start
-   👴️  Supports IE9+

> **Note**  
> This version is Nuxt 3 & Nuxt Bridge only. For Nuxt 2 see [1.0.1](https://www.npmjs.com/package/nuxt-viewport/v/1.0.1)

## [Quick Setup](https://nuxt.com/modules/nuxt-viewport#quick-setup)

### 1.  Add `nuxt-viewport` dependency to your project

```sh
# Using npm
npm install --save-dev nuxt-viewport
# Using yarn
yarn add --dev nuxt-viewport
```

### 2.  Add `nuxt-viewport` to the `modules` section of `nuxt.config.js`

```
{
  modules: [
    [
      'nuxt-viewport', {
        /* Viewport options */
      }
    ],
  ]
}
```

using top level options

```
{
  modules: [
    'nuxt-viewport',
  ],

  viewport: {
    /* Viewport options */
  },
}
```

## [Usage](https://nuxt.com/modules/nuxt-viewport#usage)

```vue
<script setup>
import { useNuxtApp } from '#app'
const { $viewport } = useNuxtApp()

watch($viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {
  console.log('Breakpoint updated:', oldBreakpoint, '->', newBreakpoint)
})
</script>

<template>
  <div>
    <div v-if="$viewport.isLessThan('tablet')">Should render only on mobile</div>
    <div v-else>Current breakpoint: {{ $viewport.breakpoint }}</div>
  </div>
</template>
```

## [Usage with composable](https://nuxt.com/modules/nuxt-viewport#usage-with-composable)

```vue
<script setup>
const viewport = useViewport()

watch(viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {
  console.log('Breakpoint updated:', oldBreakpoint, '->', newBreakpoint)
})
</script>

<template>
  <div>
    <div v-if="viewport.isLessThan('tablet')">Should render only on mobile</div>
    <div v-else>Current breakpoint: {{ viewport.breakpoint }}</div>
  </div>
</template>
```

## [Usage with "@nuxt/bridge"](https://nuxt.com/modules/nuxt-viewport#usage-with-nuxtbridge)

```vue
<script setup>
const viewport = useViewport()

watch(viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {
  console.log('Breakpoint updated:', oldBreakpoint, '->', newBreakpoint)
})
</script>

<template>
  <div>
    <div v-if="viewport.isLessThan('tablet')">Should render only on mobile</div>
    <div v-else>Current breakpoint: {{ $viewport.breakpoint }}</div>
  </div>
</template>
```

## [Configuration](https://nuxt.com/modules/nuxt-viewport#configuration)

### [`breakpoints`](https://nuxt.com/modules/nuxt-viewport#breakpoints)

-   Type: Object

An object where the key is the name of the viewport, and the value is the viewport size.

### [`cookieName`](https://nuxt.com/modules/nuxt-viewport#cookiename)

-   Type: String
-   Default: `viewport`

The key for the document cookie.

### [`defaultBreakpoints`](https://nuxt.com/modules/nuxt-viewport#defaultbreakpoints)

-   Type: Object
-   Detectable devices: `console`, `desktop`, `embedded`, `mobile`, `smarttv`, `tablet`, `wearable`

An object where the key is the name of the detected device, and the value is the breakpoint key.

### [`fallbackBreakpoint`](https://nuxt.com/modules/nuxt-viewport#fallbackbreakpoint)

-   Type: String
-   Default: `viewport`

The breakpoint key to be used, if the device was not detected.

## [Default configuration](https://nuxt.com/modules/nuxt-viewport#default-configuration)

```json
{
  // ...
  viewport: {
    breakpoints: {
      desktop: 1024,
      desktopMedium: 1280,
      desktopWide: 1600,

      mobile: 320,
      mobileMedium: 375,
      mobileWide: 425,

      tablet: 768,
    },

    cookieName: 'viewport',

    defaultBreakpoints: {
      desktop: 'desktop',
      mobile: 'mobile',
      tablet: 'tablet',
    },

    fallbackBreakpoint: 'desktop',
  },
  // ...
}
```

## [Example configuration for Tailwind CSS](https://nuxt.com/modules/nuxt-viewport#example-configuration-for-tailwind-css)

```json
{
  // ...
  viewport: {
    breakpoints: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },

    defaultBreakpoints: {
      desktop: 'lg',
      mobile: 'xs',
      tablet: 'md',
    },

    fallbackBreakpoint: 'lg'
  },
  // ...
}
```

## [API](https://nuxt.com/modules/nuxt-viewport#api)

### [`viewport.breakpoint`](https://nuxt.com/modules/nuxt-viewport#viewportbreakpoint)

-   Type: String

Current breakpoint.

### [`viewport.isGreaterThan`](https://nuxt.com/modules/nuxt-viewport#viewportisgreaterthan)

-   Type: Boolean

```ts
// Example: viewport.breakpoint is "mobile".

viewport.isGreaterThan('mobile') // Result: false.
viewport.isGreaterThan('desktop') // Result: false.
```

### [`viewport.isGreaterOrEquals`](https://nuxt.com/modules/nuxt-viewport#viewportisgreaterorequals)

-   Type: Boolean

```js
// Example: viewport.breakpoint is "mobile".

viewport.isGreaterOrEquals('mobile') // Result: true.
viewport.isGreaterOrEquals('desktop') // Result: false.
```

### [`viewport.isLessThan`](https://nuxt.com/modules/nuxt-viewport#viewportislessthan)

-   Type: Boolean

```js
// Example: viewport.breakpoint is "desktop".

viewport.isLessThan('desktopWide') // Result: true.
viewport.isLessThan('mobile') // Result: false.
```

### [`viewport.match`](https://nuxt.com/modules/nuxt-viewport#viewportmatch)

-   Type: Boolean

```js
// Example: viewport.breakpoint is "tablet".

viewport.match('tablet') // Result: true.
viewport.match('desktop') // Result: false.
```

### [`viewport.matches`](https://nuxt.com/modules/nuxt-viewport#viewportmatches)

-   Type: Boolean

```
// Example: viewport.breakpoint is "mobileWide".

viewport.matches('tablet', 'mobileWide') // Result: true.
viewport.matches('mobile', 'tablet') // Result: false.
```

### [`viewport.queries`](https://nuxt.com/modules/nuxt-viewport#viewportqueries)

-   Type: Object

Object with generated media queries.

## [Contributing](https://nuxt.com/modules/nuxt-viewport#contributing)

You can contribute to this module online with CodeSandBox:

[![Edit nuxt-viewport](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/mvrlin/nuxt-viewport/tree/main/?fontsize=14&hidenavigation=1&theme=dark)

Or locally:

1.  Clone this repository
2.  Install dependencies using `yarn install` or `npm install`
3.  Start development server using `yarn dev` or `npm run dev`
