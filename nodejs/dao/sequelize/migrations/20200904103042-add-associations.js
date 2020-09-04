"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Beers", "country", {
      type: Sequelize.STRING,
      references: {
        model: "Countries",
        key: "code",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Beers", "country");
  },
};
