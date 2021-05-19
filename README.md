# tm-text-tagging-ui

## Project setup

Install dependencies

```
npm install
```

Generate clients for GraphQL and REST backend

```
npm run generate
```

Running annotation-store-backend on `localhost:4000` is needed.

### Compiles and hot-reloads for development

```
npm run serve
```

The compile warning `export 'onServerPrefetch' was not found in 'vue-demi'` is an [issue in the vue apollo package](https://github.com/vuejs/vue-apollo/issues/1102).

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```
