# Docker getting started: Server <!-- omit in toc -->

**Objective**: build a simple REST API, with an unique `GET` endpoint, which serves a list of beers, first hard-coded and then from a database

- [Run the example (Node.js only)](#run-the-example-nodejs-only)
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
  - [Environment variable for Sequelize](#environment-variable-for-sequelize)
  - [Environment splitting](#environment-splitting)

## Run the example (Node.js only)

Developed with `node 13.8.0`:

- Install dependencies

  ```sh
  npm install
  ```

- Run the standalone version:

  ```sh
  node index.js
  ```

- Run against a database:

  - Create and populate the database on the first run:

    ```sh
    export DATABASE_URL="postgres://padawan:some-jedi-level-password-here@localhost:5432/bw__docker_getting_started"
    npm run db:init
    # db:init script added for convenience and is the same as:
    #
    # npx sequelize-cli db:create
    # npx sequelize-cli db:migrate
    # npx sequelize-cli db:seed:all
    ```

  - Start:
    ```sh
    # DATABASE_URL is assumed to have been set-up during the database migration
    node index.js
    ```

## A simple API with Koa

To do honor to my laziness, I picked a framework: [Koa](https://koajs.com/). In the context of learning Docker, the choice of the framework is completely irrelevant as I just needed an excuse to install dependencies. Installing dependencies is a good way to put a spotlight on [Docker build cache](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#leverage-build-cache)

_Why Koa?_

I have been playing mainly with [Express](https://expressjs.com/) so far. As mentioned in the [Koa introduction](https://koajs.com/#introduction), Koa is developed by the team behind Express. If the team behind the most used framework decided to go for something new, there must be a valid reason. Also, I am pretty sure those guys know what they are doing so I turned on my curious sheep mode and followed them.

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
  return [{ name: "Kriek" }, { name: "Pêcheresse" }];
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

I use PostgreSQL now by habit. Please check [PostgreSQL getting started](../../pgsql-getting-started/README.md) for any setup related information.

[Sequelize](https://sequelize.org/) is one, if not the most, of the mostly used ORM in Node.js ecosystem. So I'll go with it.

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

The Sequelize CLI is a nice tool for bootstrapping. I forgot to [`npx sequelize-cli init`](https://sequelize.org/v5/manual/migrations.html#bootstrapping) so I created the folder and files manually:

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
    "password": "some-jedi-level-password-here",
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

  // Rollback is deleting everything!
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

`require("../db")` is lazy loaded not for performance: I need this as I will handle both database data and hard-coded data in the same code in [`services/index.js`](services/index.js). `db/index.js` is

```js
// ----- IMPORTS
const Sequelize = require("sequelize");
const beerModel = require("./models/beer");

// ----- CONFIG
const dbUrl = process.env.DATABASE_URL;

// ----- INIT
if (!dbUrl) {
  throw new Error(`DATABASE_URL environment variable is missing`);
}
const sequelize = new Sequelize(dbUrl);

// ----- Sequelize: models definition
const Beer = beerModel(sequelize, Sequelize);

module.exports = {
  Beer
};
```

## Docker preparation

### Environment variable for Sequelize

While `db/index.js` is properly using `DATABASE_URL`, Sequelize CLI configuration is currently using hard-coded credentials in the `db/config/config.json`. As state in the [sequelize/cli Issue#77](https://github.com/sequelize/cli/issues/77#issuecomment-68299495), it is possible to use environment variable in the `config.json` ([documentation link](https://github.com/sequelize/cli/tree/master/docs#configuration-connection-environment-variable)).

### Environment splitting

Now that our `db/config/config.json` is reduced to :

```json
{
  "development": {
    "use_env_variable": "DATABASE_URL"
  }
}
```

We are ready to dockerize our application. As this application is very simple, there is no point adding a dedicated environment such as _production_.
