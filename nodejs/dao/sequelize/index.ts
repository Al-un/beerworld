// ----- IMPORTS
const Sequelize = require("sequelize");
const beerModel = require("./models/beer");
const countryModel = require("./models/country");

// ----- CONFIG
const dbUrl = "postgres://padawan:padawan@localhost:5432/bw_nodejs";

// ----- INIT
if (!dbUrl) {
  throw new Error(`DATABASE_URL environment variable is missing`);
}
const sequelize = new Sequelize(dbUrl);

// ----- Sequelize: models definition
import {DAO } from "../models";
import { SequelizeBeerDAO } from "./beers";

export const SequelizeDAO: DAO = {
  beer: SequelizeBeerDAO(beerModel(sequelize, Sequelize)),
};
