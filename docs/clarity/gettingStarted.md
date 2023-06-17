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
