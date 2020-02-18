/**
 * Return beers from the database if a DATABASE_URL environment is defined,
 * otherwise, some hard-coded beers are returned. The point is not to have
 * a fully operational API but an API which can work without a database first
 * and then with a database
 *
 * @returns list of beers
 */
const getBeers = async () => {
  // Get from DB
  if (process.env.DATABASE_URL) {
    const db = require("../db");
    const Beer = db.Beer;

    const data = await Beer.findAll({ attributes: ["name", "createdAt"] });
    return data;
  }
  // Get arbitrary value
  else {
    return [{ name: "Kriek" }, { name: "Pecheresse" }];
  }
};

module.exports = {
  getBeers
};
