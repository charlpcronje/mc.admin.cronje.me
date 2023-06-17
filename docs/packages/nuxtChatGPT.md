# [Nuxt Chatgpt](https://nuxt.com/modules/nuxt-chatgpt#undefined)


## [About the module](https://nuxt.com/modules/nuxt-chatgpt#about-the-module)

## [Features](https://nuxt.com/modules/nuxt-chatgpt#features)

-   💪   Easy implementation into any [Nuxt 3](https://nuxt.com) project.
-   👉   Type-safe integration of Chatgpt into your [Nuxt 3](https://nuxt.com) project.
-   🕹️   Provides a `useChatgpt()` composable that grants easy access to the `chat`, and `chatCompletion` methods.
-   🔥   Ensures security by routing requests through a [Nitro Server](https://nuxt.com/docs/guide/concepts/server-engine), preventing the **API Key** from being exposed.
-   🧱   It is lightweight and performs well.

## [Getting Started](https://nuxt.com/modules/nuxt-chatgpt#getting-started)

1.  Add nuxt-chatgpt dependency to your project

- npm

```sh
npm install --save-dev nuxt-chatgpt
```    
- pnpm
    
```sh
pnpm add -D nuxt-chatgpt
```

    
- yarn
    
```sh
yarn add --dev nuxt-chatgpt
```
    
2. Add nuxt-chatgpt to the modules section of nuxt.config.ts

```ts
export default defineNuxtConfig({
  modules: ["nuxt-chatgpt"],

  // entirely optional
  chatgpt: {
    apiKey: 'Your apiKey here goes here'
  },
})
```

That's it! You can now use Nuxt Chatgpt in your Nuxt app 🔥

## [Usage & Examples](https://nuxt.com/modules/nuxt-chatgpt#usage-examples)

To access the `chat`, and `chatCompletion` methods in the nuxt-chatgpt module, you can use the `useChatgpt()` composable, which provides easy access to them. The `chat`, and `chatCompletion` methods requires three parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| **message** | `String` |  | A string representing the text message that you want to send to the GPT model for processing. |
| **model** | `String` | `text-`davinci`-003` for `chat()` and `gpt-3.5-turbo` for `chatCompletion()` | Represent certain model for different types of natural language processing tasks. |
| **options** | `Object` | `{ temperature: 0.5, max_tokens: 2048, top_p: 1 frequency_penalty: 0, presence_penalty: 0 }` | An optional object that specifies any additional options you want to pass to the API request, such as the number of responses to generate, and the maximum length of each response. |

Available models for `chat`

- text-`davinci`-003
- text-`davinci`-002

Available models for `chatCompletion`

- `gpt-3.5-turbo`
- `gpt-3.5-turbo-0301`

You need to join wait list` to use gpt-4 models within `chatCompletion` method

- `gpt-4`
- `gpt-4-0314`
- `gpt-4-32k`
- `gpt-4-32k-0314`

### [Simple `chat` usage](https://nuxt.com/modules/nuxt-chatgpt#simple-chat-usage)

In the following example, the model is unspecified, and the text-davinci-003 model will be used by default.

```ts
const { chat } = useChatgpt()

const data = ref('')
const message = ref('')

async function sendMessage() {
  const response = await chat(message.value)
  data.value = response
}
```

```vue
<template>
  <div>
    <input v-model="message">
    <button
      @click="sendMessage"
      v-text="'Send'"
    />
    <div>{{ data }}</div>
  </div>
</template>
```

### [Usage of `chat` with different model](https://nuxt.com/modules/nuxt-chatgpt#usage-of-chat-with-different-model)

```ts
const { chat } = useChatgpt()

const data = ref('')
const message = ref('')

async function sendMessage() {
  const response = await chat(message.value, 'text-davinci-002')
  data.value = response
}
```

```vue
<template>
  <div>
    <input v-model="message">
    <button
      @click="sendMessage"
      v-text="'Send'"
    />
    <div>{{ data }}</div>
  </div>
</template>
```

### [Simple `chatCompletion` usage](https://nuxt.com/modules/nuxt-chatgpt#simple-chatcompletion-usage)

In the following example, the model is unspecified, and the gpt-3.5-turbo model will be used by default.

```ts
const { chatCompletion } = useChatgpt()

const data = ref('')
const message = ref('')

async function sendMessage() {
  const response = await chatCompletion(message.value)
  data.value = response
}
```

```vue
<template>
  <div>
    <input v-model="message">
    <button
      @click="sendMessage"
      v-text="'Send'"
    />
    <div>{{ data }}</div>
  </div>
</template>
```

### [Usage of `chatCompletion` with different model](https://nuxt.com/modules/nuxt-chatgpt#usage-of-chatcompletion-with-different-model)

```ts
const { chatCompletion } = useChatgpt()

const data = ref('')
const message = ref('')

async function sendMessage() {
  const response = await chatCompletion(message.value, 'gpt-3.5-turbo-0301')
  data.value = response
}
```

```vue
<template>
  <div>
    <input v-model="message">
    <button
      @click="sendMessage"
      v-text="'Send'"
    />
    <div>{{ data }}</div>
  </div>
</template>
```

## [chat vs chatCompletion](https://nuxt.com/modules/nuxt-chatgpt#chat-vs-chatcompletion)

The `chat` method allows the user to send a prompt to the OpenAI API and receive a response. You can use this endpoint to build conversational interfaces that can interact with users in a natural way. For example, you could use the chat method to build a chatbot that can answer customer service questions or provide information about a product or service.

The `chatCompletion` method is similar to the `chat` method, but it provides additional functionality for generating longer, more complex responses. Specifically, the chatCompletion method allows you to provide a conversation history as input, which the API can use to generate a response that is consistent with the context of the conversation. This makes it possible to build chatbots that can engage in longer, more natural conversations with users.

## [Module Options](https://nuxt.com/modules/nuxt-chatgpt#module-options)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| **apiKey** | `String` | `xxxxxx` | Your apiKey here goes here |
| **isEnabled** | `Boolean` | `true` | Enable or disable the module. `True` by default. |

## [Contributing](https://nuxt.com/modules/nuxt-chatgpt#contributing)

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## [License](https://nuxt.com/modules/nuxt-chatgpt#license)

Distributed under the MIT License. See `LICENSE.txt` for more information.

## [Contact](https://nuxt.com/modules/nuxt-chatgpt#contact)

Oliver Trajceski - [LinkedIn](https://mk.linkedin.com/in/oliver-trajceski-8a28b070) - [oliver@akrinum.com](mailto:oliver@akrinum.com)

Project Link: [https://github.com/schnapsterdog/nuxt-chatgpt](https://github.com/schnapsterdog/nuxt-chatgpt)

## [Development](https://nuxt.com/modules/nuxt-chatgpt#development)

```sh
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```
