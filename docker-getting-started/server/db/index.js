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
