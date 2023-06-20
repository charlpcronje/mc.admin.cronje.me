# Indexing my code for SourceGraph

One-off indexing using scip-typescript locally
Creating one-off indexes and uploading them is valuable as a proof of concept, but indexes are not kept up to date.

The steps here are similar to those in the previous GitHub Actions example.

## 1. Install scip-typescript.

```sh
npm install -g @sourcegraph/scip-typescript
# or
yarn add global @sourcegraph/scip-typescript
```


## 2. Install the Sourcegraph CLI.

```sh
curl -L https://sourcegraph.com/.api/src-cli/src_linux_amd64 -o /usr/local/bin/src
chmod +x /usr/local/bin/src
```

- The exact invocation may change depending on the OS and architecture. See the `src-cli` README for details.

## 3. `cd` into your project's root 

(which contains `package.json/tsconfig.json`) and run the following:

```sh
# (1) Enable type-checking code used from external packages and 
# (2) cross-repo navigation by installing dependencies first with npm or yarn

npm install
# or
yarn

scip-typescript index
```

### for TypeScript projects

If you are indexing a JavaScript codebase or a project using Yarn workspaces, tweak the `scip-typescript` invocation as documented in the [Optional scip-typescript flags](https://docs.sourcegraph.com/code_navigation/how-to/index_a_typescript_and_javascript_repository#optional-scip-typescript-flags) section.


## 4. Upload the data to a Sourcegraph instance.

```sh
# for private instances
SRC_ENDPOINT=<your sourcegraph endpoint> src code-intel upload

# for public instances
src code-intel upload -github-token=<your github token>
```

The upload command will provide a URL you can visit to see the upload status. Once the upload has finished processing, you can visit the repo and enjoy precise code navigation!