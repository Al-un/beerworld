# Docker getting started: Server <!-- omit in toc -->

**Objective**: build a simple REST API, with an unique `GET` endpoint, which serves a list of beers, first hard-coded and then from a database

- [A simple API with Koa](#a-simple-api-with-koa)
  - [First steps](#first-steps)
  - [CORS](#cors)
- [Database with Sequelize](#database-with-sequelize)
  - [Setup](#setup)
  - [Configuration](#configuration)
  - [First model and seed](#first-model-and-seed)
  - [Migration](#migration)
  - [Updated services](#updated-services)
- [Docker preparation](#docker-preparation)

## A simple API with Koa

To do honor to my laziness, I picked a framework: [Koa](https://koajs.com/). In the context of learning Docker, the choice of the framework is completely irrelevant as I just needed an excuse to install dependencies. Installing dependencies is a good way to put a spotlight on [Docker build cache](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#leverage-build-cache)

_Why Koa?_

I have been playing with [Express](https://expressjs.com/) so far. As mentioned in the [Koa introduction](https://koajs.com/#introduction), Koa is developed by the team behind Express. If the team behind the most used framework decided to go for something new, there must be a valid reason. Also, I am pretty sure those guys know what they are doing so I turned on my curious sheep mode and followed them.

### First steps

The project initialisation is immediately followed by Koa installation:

```sh
cd server
npm init
npm install --save koa

# Create the entry point defined during "npm init"
touch index.js

# Create the "services" folder which will manage our endpoint(s)
mkdir services
touch services/index.js
```

Our Beer service, as the API is not using a database yet, simply returns a list of beers

```js
// services/index.js

const getBeers = async () => {
  return [{ name: "Kriek" }, { name: "Pecheresse" }];
};

module.exports = {
  getBeers
};
```

Following [Koa.js helloworld](https://koajs.com/#application), our server is

```js
// index.js

// ----- IMPORTS
const Koa = require("koa");
const services = require("./services");

// ----- CONFIG
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 3000;
const app = new Koa();

app.use(async ctx => {
  const payload = await services.getBeers();
  ctx.body = JSON.stringify(payload);
});

app.listen(PORT, HOST);
console.log(`Listen to port http://${HOST}:${PORT}...`);
```

### CORS

In my local configuration, I serve my API on the port 3000 and my front-end is running on port 8080 so...CORS. It seems that the Koa ecosystem has a [cors](https://github.com/koajs/cors) library so I will not search any further:

```sh
npm install --save @koa/cors@2
```

Just add CORS stuff in `index.js`:

```diff
// ----- IMPORTS
const Koa = require("koa");
+ const cors = require("@koa/cors");
const services = require("./services");

// ----- CONFIG
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 3000;
const app = new Koa();
+ app.use(cors({ origin: "*", allowHeaders: "*", allowMethods: "*" }));

app.use(async ctx => {
  const payload = await services.getBeers();
  ctx.body = JSON.stringify(payload);
});

app.listen(PORT, HOST);
console.log(`Listen to port http://${HOST}:${PORT}...`);
```

Everything is meant for local development so I indulge myself the wildcards

## Database with Sequelize

I use PostgreSQL now by habit. Please check [PostgreSQL getting started](../../pgsql-getting-started/README.md) if necessary.

In my mind, [Sequelize](https://sequelize.org/) is one, if not the most, of the mostly used ORM in Node.js universe. So I'll go for it

### Setup

```sh
# Install Sequelize
npm install --save sequelize
# PostgreSQL driver: https://sequelize.org/v5/manual/getting-started.html
npm install --save pg pg-store
# CLI to handle migration
npm install -save sequelize-cli
```

### Configuration

The Sequelize CLI is a nice tool for bootstrapping many things. I missed the [`npx sequelize-cli init`](https://sequelize.org/v5/manual/migrations.html#bootstrapping) so I created the folder and files manually:

```
mkdir db
mkdir db/config
mkdir db/migrations
mkdir db/models
mkdir db/seeders
touch db/config/config.json
```

The [`.sequelizerc`](https://sequelize.org/v5/manual/migrations.html#the--code--sequelizerc--code--file) file will tell the CLI where our configuration:

```js
// .sequelizerc

const path = require("path");

module.exports = {
  config: path.resolve("db", "config", "config.json"),
  "models-path": path.resolve("db", "models"),
  "seeders-path": path.resolve("db", "seeders"),
  "migrations-path": path.resolve("db", "migrations")
};
```

Then, let's have Sequelize connecting to our database:

```json
// db/config/config.json

{
  // When not specified, "development" is the default environment
  "development": {
    "username": "padawan",
    "password": "padawan",
    "database": "bw__docker_getting_started",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

### First model and seed

This application is not meant to dive into Sequelize so I will be brief here. Let's have the Sequelize CLI generate the `Beer` model which has one a name

```sh
# https://sequelize.org/v5/manual/migrations.html#creating-first-model--and-migration-
npx sequelize-cli model:generate --name Beer --attributes name:string
```

`db/models/beer.js` should be created. Now that the structure is ready, let's prepare some seeds. Our API only has a single `GET` endpoint so it will not be able to create data.

```sh
# https://sequelize.org/v5/manual/migrations.html#creating-first-seed
npx sequelize-cli seed:generate --name first-beers
```

This will create a file in `db/seeders` which needs to be manually modified. I modified as

```js
// db/seeders/20200216084016-first-beers.js

// https://sequelize.org/v5/manual/migrations.html#creating-first-seed
"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Beers",
      [
        // createdAt and updatedAt are bootstrapped fields which cannot be NULL
        { name: "Stella Artois", createdAt: new Date(), updatedAt: new Date() },
        { name: "Affligem", createdAt: new Date(), updatedAt: new Date() },
        { name: "Grimbergen", createdAt: new Date(), updatedAt: new Date() }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Beers", null, {});
  }
};
```

### Migration

Now that everything is ready, it is time for our database to be part of the game too:

```sh
npx sequelize-cli db:create --env development
npx sequelize-cli db:migrate --env development
npx sequelize-cli db:seed:all --env development
```

### Updated services

Our `services/index.js` can now fetch data from the database

```diff
// services/index.js

const getBeers = async () => {
-  return [{ name: "Kriek" }, { name: "Pecheresse" }];
+    const db = require("../db");
+    const Beer = db.Beer;
+
+    const data = await Beer.findAll({ attributes: ["name", "createdAt"] });
+    return data;
};

module.exports = {
  getBeers
};
```

`require("../db")` is lazy loaded not for performance: I need this form for my final where both database data and hard-coded data co-exist

## Docker preparation

Right now, the API uses the local database but once in a docker container, it might use a different database. To address this point, I created a `docker` environment in the Sequelize configuration. Such configuration will be used for learning [Docker compose](../../docker-compose/README.md)

```json
// db/config/config.json

{
  "development": {
    "username": "padawan",
    "password": "padawan",
    "database": "bw__docker_getting_started",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  // Docker configuration:
  // - both "username" and "password" must match the credentials defined in the
  //   docker-compose.yml
  // - "host" must match the name of the service
  // - "database" name can be anything as migrations are expected to be run on
  //   application startup
  "docker": {
    "username": "mydockeruser",
    "password": "mydockerpassword",
    "database": "bw__docker_getting_started",
    "host": "web-db",
    "dialect": "postgres"
  }
}
```
