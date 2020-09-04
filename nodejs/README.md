# Nodejs <!-- omit in toc -->

- [Approach](#approach)
- [Frameworks](#frameworks)
  - [Express](#express)
  - [Koa](#koa)
- [DAO](#dao)
  - [Dummy DAO](#dummy-dao)
  - [Sequelize](#sequelize)
    - [Setup](#setup)
    - [References](#references)
- [Sources](#sources)

## Approach

## Frameworks

### Express

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
