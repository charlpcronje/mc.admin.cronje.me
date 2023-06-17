# At [https://getmetal.io](https://getmetal.io)

There are free plans to get started, and flexible plans to grow with you.

**Here is Metal in action:**

# Introduction - Metal

> ## Excerpt
> Learn how to build with Metal in your Node.js project.

---
# Introduction

Learn how to build with Metal in your Node.js project.

## [Prerequisites](https://docs.getmetal.io/quick-nodejs#prerequisites)

Before you begin, you’ll need to:

-   [Create an Index](https://docs.getmetal.io/misc-create-index)
-   [Create an API Key](https://docs.getmetal.io/misc-get-keys) for [authentication](https://docs.getmetal.io/api-reference/introduction#authentication)

## [Install](https://docs.getmetal.io/quick-nodejs#install)


```bash
npm install @getmetal/metal-sdk
# or
yarn add @getmetal/metal-sdk
```

## [Retrieval](https://docs.getmetal.io/quick-nodejs#retrieval)

### [1. Embed & Index](https://docs.getmetal.io/quick-nodejs#1-embed-and-index)

The first step is to embed your data into Metal. This will allow you to compare your text to other text in the index.

### 1.1. Text

```js
import { Metal } from '@getmetal/metal-sdk';

// Note: Index must be embeddings-ada-02
const metal = new Metal(
  'pk_1234567890',  // api-key
  'ci_1234567890',  // client-id
  'index_1234567890', // index-id
);

(async () => {
  const embeddingDocument = await metal.index({
    text: 'A rocket flying towards mars.',
    metadata: {
      category: 'space',
    },
  });

  console.log(embeddingDocument);
})();
```

### 1.2. File

```js
import { Metal } from '@getmetal/metal-sdk';

// Note: Index must be embeddings-ada-02
const metal = new Metal(
  'pk_1234567890',  // api-key
  'ci_1234567890',  // client-id
  'index_1234567890', // index-id
);

(async () => {
  const embeddedFile = await metal.uploadFile({
    file: 'path/to/file.(txt|pdf|csv)',
  })

  console.log(embeddedFile);
})();
```

### 1.3. Image

```js
import { Metal } from '@getmetal/metal-sdk';

// Note: Index must be CLIP
const metal = new Metal(
  'pk_1234567890',  // api-key
  'ci_1234567890',  // client-id
  'index_1234567890', // index-id
);

(async () => {
  const embeddedImg = await metal.index({
    imageUrl: 'https://path-to-image.jpg',
  })

  console.log(embeddedImg);
})();
```

### 1.4. Web UI

```js
// 1. Go to https://app.getmetal.io
// 2. Navigate to your index dashboard
// 3. Click "+ Import"
```

### [2. Semantic Search](https://docs.getmetal.io/quick-nodejs#2-semantic-search)

Next, we’ll want to run a semantic search against the index. This will allow us to find similar text to the text we just embedded.

### 2.1. Text

```ts
import { Metal } from '@getmetal/metal-sdk';

// Note: Index must be embeddings-ada-02
const metal = new Metal(
  'pk_1234567890',  // api-key
  'ci_1234567890',  // client-id
  'index_1234567890', // index-id
);


(async () => {
  const results = await metal.search({
    text: 'space travel',
  });

  console.log(results);

})();
```

### 2.2. Image

```ts
import { Metal } from '@getmetal/metal-sdk';

// Note: Index must be CLIP
const metal = new Metal(
  'pk_1234567890',  // api-key
  'ci_1234567890',  // client-id
  'index_1234567890', // index-id
);


(async () => {
  const results = await metal.search({
    imageUrl: 'https://path-to-image.jpg',
  });

  console.log(results);

})();
```

### 2.3. Web UI

```js
// 1. Go to https://app.getmetal.io
// 2. Navigate to your index browse page
// 3. Search for a term in the input box
```

## [Memory](https://docs.getmetal.io/quick-nodejs#memory)

### [2. Add a Memory](https://docs.getmetal.io/quick-nodejs#1-add-a-memory)

First we’ll want to add a Memory Session so that you can track LLM sessions for your users.

```ts
import { Motorhead } from '@getmetal/metal-sdk'

const motor = new Motorhead({
  apiKey: 'pk_1234567890',  // api-key
  clientId: 'ci_1234567890',  // client-id
});


(async () => {
  const mem = await motor.addMemory(
    'my-session-id',
    {
      messages: [
        { role: 'Human', content: 'hello, ai' },
        { role: 'AI', content: 'hello, human' },
      ],
    },
  );

  console.log(mem);

})();

```

### [4. Get a Memory](https://docs.getmetal.io/quick-nodejs#2-get-a-memory)

We’ll then want to allow you to fetch your memory session so that you can provide the LLM with historical context.

```ts
import { Motorhead } from '@getmetal/metal-sdk'

const motor = new Motorhead({
  apiKey: 'pk_1234567890',  // api-key
  clientId: 'ci_1234567890',  // client-id
});

(async () => {
  const session = await motor.getMemory('my-session-id');
  console.log(session);
})();

```

## [](https://docs.getmetal.io/quick-nodejs#check-out-the-library)

[Check out the library](https://github.com/getmetal/metal-ts)

## [Metal Node.js SDK](https://github.com/getmetal/metal-ts)

[](https://github.com/getmetal/metal-ts)[https://github.com/getmetal/metal-ts](https://github.com/getmetal/metal-ts)
