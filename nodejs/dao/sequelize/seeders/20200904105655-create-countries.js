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
    await queryInterface.bulkInsert("Countries", [
      { code: "be", createdAt: new Date(), updatedAt: new Date() },
      { code: "ie", createdAt: new Date(), updatedAt: new Date() },
      { code: "fr", createdAt: new Date(), updatedAt: new Date() },
      { code: "jp", createdAt: new Date(), updatedAt: new Date() },
      { code: "us", createdAt: new Date(), updatedAt: new Date() },
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
