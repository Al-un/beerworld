"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Beers", [
      {
        name: "Kilkenny",
        country: "ie",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Grimbergen",
        country: "be",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tripel Karmeliet",
        country: "be",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Goose IPA",
        country: "us",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Murphy's Irish Red",
        country: "ie",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
