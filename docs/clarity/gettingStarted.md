# Getting Started with Clarity

1. Sign up for Clarity at [clarity.microsoft.com](https://clarity.microsoft.com)
2. Create a new project
3. Copy the Clarity tag
4. Paste the Clarity tag into your website's HTML, just before the closing `</head>` tag

``` html
// tag for admin.mc.cronje.me 
<head>

<!-- 
    Clarity tag for admin.mc.cronje.me 
    Generated: 2021-10-20T14:00:00.000Z
    Site: https://admin.mc.cronje.me
    Project: 1
-->
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "hla1pbbh65");
</script>
</head>
```

## Method 1

Adding the tag to my NuxtJS project was as simple as adding the following to my `nuxt.config.js` file:

``` js
head: {
    script: [
      {
        hid: 'clarity',
        src: 'https://www.clarity.ms/tag/hla1pbbh65',
        async: true,
      },
    ],
  },
```

## New Method

# NuxtJS Microsoft Clarity

A NuxtJS plugin for injecting the Microsoft Clarity script tags into the head section of the HTMl page

## [](https://github.com/PerDiemInc/nuxt-microsoft-clarity#table-of-contents)Table of Contents

-   [Requirements](https://github.com/PerDiemInc/nuxt-microsoft-clarity#requirements)
-   [Install](https://github.com/PerDiemInc/nuxt-microsoft-clarity#install)
-   [Getting Started](https://github.com/PerDiemInc/nuxt-microsoft-clarity#getting-started)
-   [Options](https://github.com/PerDiemInc/nuxt-microsoft-clarity#options)
-   [Usage](https://github.com/PerDiemInc/nuxt-microsoft-clarity#usage)

## [](https://github.com/PerDiemInc/nuxt-microsoft-clarity#requirements)Requirements

-   npm
-   NuxtJS
-   NodeJS

## [](https://github.com/PerDiemInc/nuxt-microsoft-clarity#install)Install

```shell
  # npm
  $ npm i nuxtjs-microsoft-clarity --save

  # yarn
  $ yarn add nuxtjs-microsoft-clarity
```

## [](https://github.com/PerDiemInc/nuxt-microsoft-clarity#getting-started)Getting Started

Add `'nuxtjs-microsoft-clarity'` to the `modules` section of your `nuxt.config.js` file.

### [](https://github.com/PerDiemInc/nuxt-microsoft-clarity#method-1-inline-configuration-entry)Method 1: Inline configuration entry

```js
{
  modules: [
    'nuxtjs-microsoft-clarity', {
      // Options
    }
  ],
}
```

### [](https://github.com/PerDiemInc/nuxt-microsoft-clarity#method-2-external-configuration-entry)Method 2: External configuration entry

Add `microsoftClarity` section in `nuxt.config.js` to set the module options:

```js
{
  modules: [
    'nuxtjs-microsoft-clarity'
  ],
  microsoftClarity: {
    // Options
  },
}
```

### [](https://github.com/PerDiemInc/nuxt-microsoft-clarity#method-3-runtime-config)Method 3: Runtime Config

```js
{
  modules: [
    'nuxtjs-microsoft-clarity'
  ],
  // Use as fallback if no runtime config is provided
  microsoftClarity: {
    // Options
  },
  publicRuntimeConfig: {
    microsoftClarity: {
      // Options
    }
  }
}
```

## [](https://github.com/PerDiemInc/nuxt-microsoft-clarity#options)Options

The following options can be configured in the module's configuration entry in your `nuxt.config.js` file

### [](https://github.com/PerDiemInc/nuxt-microsoft-clarity#microsoft-clarity-id---id)Microsoft Clarity ID - `id`

-   Required
-   Default: `null`


