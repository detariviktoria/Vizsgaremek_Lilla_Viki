'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Felhasznalo_KedvencAjandek', [
      { user_id: 1, ajandek_id: 5, mentve: new Date() },
      { user_id: 2, ajandek_id: 10, mentve: new Date() }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Felhasznalo_KedvencAjandek', null, {});
  }
};
