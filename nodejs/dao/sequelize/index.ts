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
const SeqBeer = beerModel(sequelize, Sequelize);
const SeqCountry = countryModel(sequelize, Sequelize);

import { Beer, Country, DAO } from "../models";

export class SequelizeDao implements DAO {
  async createBeer(beer: Beer) {
    console.log("ToCreate",beer)
    const createdBeer = (await SeqBeer.create(beer)) as Beer;
    return createdBeer;
  }

  async deleteBeer(beerId: string) {
    const deleteCount = await SeqBeer.destroy({
      where: { id: parseInt(beerId) },
    });
    return deleteCount as number;
  }

  async getBeer(beerId: string) {
    const beers = (await SeqBeer.findAll({
      where: { id: parseInt(beerId) },
    })) as Beer[];

    return beers.length ? beers[0] : undefined;
  }

  async listBeers() {
    const beers = SeqBeer.findAll() as Beer[];
    return beers;
  }

  async updateBeer(beer: Beer, beerId: string) {
    const updatedBeerCount = (await SeqBeer.update(beer, {
      where: { id: parseInt(beerId) },
    })) as Beer;

    return this.getBeer(beerId);
  }
}
