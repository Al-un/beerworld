// ----- IMPORTS
const Sequelize = require("sequelize");
const beerModel = require("./models/beer");
const countryModel = require("./models/country");

// ----- CONFIG
import databaseConfig from "./config/database";
const { username, password, host, port, database } = databaseConfig.development;
let dbUrl = `postgres://${username}:${password}@${host}:${port}/${database}`;

const dbUrlTest = process.env[databaseConfig.test.use_env_variable];
const dbUrlProd = process.env[databaseConfig.production.use_env_variable];
dbUrl = dbUrlProd || dbUrlTest || dbUrl;

// ----- INIT
if (!dbUrl) {
  throw new Error(`DATABASE_URL environment variable is missing`);
}
export const sequelize = new Sequelize(dbUrl);

// ----- Sequelize: models definition
import { DAO } from "../models";
import { SequelizeBeerDAO } from "./beers";

export const SequelizeDAO: DAO = {
  beer: SequelizeBeerDAO(beerModel(sequelize, Sequelize)),
};
