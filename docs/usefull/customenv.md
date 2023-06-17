## Multiple .env files

To have multiple .env files and specify their names in SvelteKit, you can follow these steps:

1. Create multiple .env files with different names, for example:
   - `.env.development`
   - `.env.production`
   
2. In your SvelteKit project, create a helper function to load environment variables from the specified .env file. You can use the `dotenv` package for this purpose. First, install it:

   ```bash
   npm install dotenv
   ```

3. Create a new file called `envLoader.js` in your `src` folder and add the following code:

   ```js
   import * as process from "process";
   import * as path from "path";
   import dotenv from "dotenv";

   export function loadEnv(envFilename) {
     const envPath = path.resolve(process.cwd(), envFilename);
     const loaded = dotenv.config({ path: envPath });

     if (loaded.error) {
       throw loaded.error;
     }

     return loaded.parsed;
   }
   ```

   This function takes the name of the .env file and loads the environment variables from it using the `dotenv` package.

4. In your `src/hooks.js` file, import the `loadEnv` function and call it with the desired .env file name based on the current environment:

   ```js
   import { loadEnv } from "./envLoader";

   const isProduction = process.env.NODE_ENV === "production";
   const envFilename = isProduction ? ".env.production" : ".env.development";
   const env = loadEnv(envFilename);

   // Use the loaded environment variables in your hooks
   ```

Now, SvelteKit will load the environment variables from the specified .env file based on the current environment (development or production). You can adjust the conditions in step 4 to load different .env files for different environments as needed.

Keep in mind that this approach works for server-side code, such as hooks. For client-side code, you need to follow the Vite convention of using `VITE_` prefixes for public environment variables, as described in [Source 1](https://joyofcode.xyz/sveltekit-environment-variables) and [Source 3](https://thingnoy.medium.com/environment-variables-in-sveltekit-and-adapter-node-f6dfce05e73a).

Additionally, consider using the built-in `$env` modules in SvelteKit as mentioned in [Source 2](https://vadosware.io/post/pattern-for-env-in-sveltekit/), which provides a more secure way of handling environment variables. However, this method may not support multiple .env files by default, so you would need to combine it with the approach described above.