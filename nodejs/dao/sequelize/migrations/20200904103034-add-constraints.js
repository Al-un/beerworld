"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Countries", {
      fields: ["code"],
      type: "unique",
      name: "countries_unique_code",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Countries", "countries_unique_code");
  },
};
