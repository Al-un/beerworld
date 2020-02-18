"use strict";

// createdAt and updatedAt are default Sequelize fields
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Beers",
      [
        { name: "Stella Artois", createdAt: new Date(), updatedAt: new Date() },
        { name: "Affligem", createdAt: new Date(), updatedAt: new Date() },
        { name: "Grimbergen", createdAt: new Date(), updatedAt: new Date() }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Beers", null, {});
  }
};
