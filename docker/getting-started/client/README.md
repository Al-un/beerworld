<sub>[Back to _Docker Getting started_](../README.md)</sub>

# Docker getting started: Client <!-- omit in toc -->

- [Run the example](#run-the-example)
- [A simple client](#a-simple-client)
- [Docker preparation](#docker-preparation)

## Run the example

A traditional install-and-serve:

```sh
npm install
npm run serve
```

If a specific API URL is required:

```sh
VUE_APP_API_ROOT_URL="http(s)://..." npm run serve
```

## A simple client

As our API has only one endpoint, the Client is a dead simple Vue.js application:

- Vue CLI is used to bootstrap the application with a minimal configuration
- The Home page loads the beers from the API, with [`src/api.js`](./src/api.js) and display the different names in some CSS grid
- API URL can be specified with `VUE_APP_API_ROOT_URL`
- Because this experiment is not about Vue.js, there is no error handling or similar safety net

In a nutshell, nothing worthy to mention here :)

## Docker preparation

All Dockerfiles were copied from [Vue.js Docker cookbook](https://vuejs.org/v2/cookbook/dockerize-vuejs-app.html) with some minor twerk. Client did not require any code adaptation for dockerisation.
