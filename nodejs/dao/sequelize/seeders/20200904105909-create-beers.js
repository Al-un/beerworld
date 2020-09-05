"use strict";

const data = require("../../data");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const beers = data.beers.map((b) => ({
      name: b.name,
      country: b.country,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("Beers", beers);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Beers", null, {});
  },
};
