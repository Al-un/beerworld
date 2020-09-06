# Nodejs <!-- omit in toc -->

- [Getting started](#getting-started)
  - [Approach](#approach)
    - [Folder structure](#folder-structure)
  - [Setup](#setup)
- [Frameworks](#frameworks)
  - [Express](#express)
  - [Koa](#koa)
- [DAO](#dao)
  - [Dummy DAO](#dummy-dao)
  - [Sequelize](#sequelize)
    - [Setup](#setup-1)
    - [References](#references)
- [Sources](#sources)
- [Test](#test)
  - [Jest + Supertest](#jest--supertest)
- [Middleware](#middleware)
  - [Authentication](#authentication)

## Getting started

### Approach

> Current folder structure is **not** meant to fully represent a production ready application. It has been twerked to try different combination of frameworks and libraries

This project tries some NodeJS framework and libraries, mainly splitting in two main parts:

1. API building
2. Database access

#### Folder structure

- _apps/_: Top level application which uses a web framework, its underlying handlers, associated with a provided DAO
  - Routing is defined here
- _build/_: TypeScript output build folder
- _dao/_: DAO layer folder with data model definition. Each sub-folder represents a library (ORM or database driver)
- _handlers/_: Service layer folder with endpoint logic. Each sub-folder represents a web framework as handlers signature depends on the framework routing syntax.

### Setup

- Create a project
  ```sh
  # Create a project
  npm init
  # Alternatively, use the default options:
  npm init -y
  ```
- Install `TypeScript`

  ```sh
  npm install --save-dev typescript ts-node @types/node
  ```

  And create a _tsconfig.json_:

  ```json
  {
    "compilerOptions": {
      "target": "es6",
      "module": "commonjs",
      "rootDir": "./",
      "outDir": "./build",
      "esModuleInterop": true,
      "strict": true
    }
  }
  ```

- Install `Nodemon`

  ```sh
  npm install --save-dev nodemon
  ```

  Add a `start` script:

  ```json
  {
    "scripts": {
      "start": "nodemon index.ts"
    }
  }
  ```

- Install some utilities:

  ```sh
  npm install uuid chalk
  npm install --save-dev @types/uuid
  ```

- Add the _.gitignore_:
  ```txt
  build/
  ```

## Frameworks

### Express

- Install:

  ```sh
  npm install express body-parser
  npm install --save-dev @types/express
  ```

- Create [handlers](./handlers/express.ts)
- Create [app](./apps/express.ts)

### Koa

## DAO

### Dummy DAO

### Sequelize

#### Setup

Install the dependencies

```sh
npm install --save sequelize
npm install --save pg pg-hstore # Postgres

npm install --save-dev sequelize-cli
```

https://sequelize.org/master/manual/getting-started.html

Create the _.sequelize.rc_

```js
const path = require("path");
// https://github.com/sequelize/cli/blob/master/docs/README.md
module.exports = {
  config: path.resolve("dao", "sequelize", "config", "database.json"),
  "models-path": path.resolve("dao", "sequelize", "models"),
  "seeders-path": path.resolve("dao", "sequelize", "seeders"),
  "migrations-path": path.resolve("dao", "sequelize", "migrations"),
};
```

```sh
npx sequelize-cli init

npx sequelize-cli model:generate --name Country --attributes code:string
npx sequelize-cli model:generate --name Beer --attributes name:string
npx sequelize-cli migration:generate --name add-constraints
npx sequelize-cli migration:generate --name add-associations

npx sequelize-cli seed:generate --name create-countries
```

- https://sequelize.org/master/class/lib/dialects/abstract/query-interface.js~QueryInterface.html#instance-method-addConstraint
- https://sequelize.org/master/class/lib/dialects/abstract/query-interface.js~QueryInterface.html#instance-method-removeConstraint

https://sequelize.org/master/manual/assocs.html

#### References

- https://sequelize.org/master/manual/
- https://medium.com/@andrewoons/how-to-define-sequelize-associations-using-migrations-de4333bf75a7

## Sources

- https://blog.logrocket.com/typescript-with-node-js-and-express/
- https://dev.to/tejaskaneriya/when-to-use-these-nodejs-frameworks-express-koa-nest-socket-io-meteor-js-3p63

## Test

- https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6
- https://jestjs.io/docs/en/configuration.html
- https://www.jaygould.co.uk/2020-07-28-jest-sequelize-testing-dedicated-database/

### Jest + Supertest

```sh
npm install --save-dev jest supertest
```

## Middleware

### Authentication

```sh
npm install jsonwebtoken validator
npm install passport passport-jwt passport-local
npm install --save @types/passport @types/passport-jwt @types/passport-local
```

- https://codeburst.io/handling-authentication-in-nodejs-express-with-passport-part-2-mongodb-and-passport-50351c6e93e
- http://www.passportjs.org/packages/passport-local/