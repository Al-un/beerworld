<sub>[Back to _Docker Network and Storage_](../README.md)</sub>

# Docker network and storage: Server <!-- omit in toc -->

**Objective**: build a simple REST API with some logging abilities as well as fetching information from other services

- [Run the example](#run-the-example)
- [Still simple API with Koa](#still-simple-api-with-koa)
  - [Log in logging file](#log-in-logging-file)
  - [Call another API](#call-another-api)

## Run the example

To run this server locally:

```sh
npm install
node index.js
```

## Still simple API with Koa

Nothing fancy here compared to the [Docker-Getting-Started server](../../getting-started/server/README.md). I am still using Koa with Koa router as there are two endpoints:

- `GET: /` delivers the beer list but each request is logged
- `GET: /logs` returns the logs

**References**

- [Koajs main page](https://koajs.com/)
- [Koa router Github repostiory](https://github.com/koajs/router)
- [Koa router documentation](https://github.com/koajs/router/blob/master/API.md#module_koa-router--Router+get%7Cput%7Cpost%7Cpatch%7Cdelete%7Cdel)

### Log in logging file

When calling the root endpoint, this server is supposed to return a list of beers. See the [_API call_](#call-another-api) section for the content. This server also logs each incoming request, including 404 links and append the log in a logging file.

`/logs` endpoint then returns all the logs logged so far.

**References**

- [Nodejs documentation: Writing file with Node.js](https://nodejs.dev/writing-files-with-nodejs/#append-to-a-file)
- [Nodejs documentation: Reading file with Node.js](https://nodejs.dev/reading-files-with-nodejs)
- [Nodejs API documentation: File System](https://nodejs.org/api/fs.html)
- [Nodejs API documentation: Readline](https://nodejs.org/api/readline.html)
- [StackOverflow: Read a file one line at a time in node.js?](https://stackoverflow.com/a/32599033/4906586)

### Call another API

To return a list of beers, I want to get the list provided by the [Docker-Getting-Started server](../../getting-started/server/README.md). An HTTP call being necessary, I tried to use the standard `http` tool but callback management ended up being complicated, I switched to Axios.

**References**

- [Node.js API documentation: http](https://nodejs.org/api/http.html)
- [Axios Github repository](https://github.com/axios/axios)
- [5 ways to make HTTP requests in Node.js](https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html)
