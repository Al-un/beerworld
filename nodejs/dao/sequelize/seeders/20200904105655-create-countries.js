"use strict";

const data = require("../../data");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const countries = data.countries.map((c) => ({
      code: c.code,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("Countries", countries);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Countries", null, {});
  },
};
