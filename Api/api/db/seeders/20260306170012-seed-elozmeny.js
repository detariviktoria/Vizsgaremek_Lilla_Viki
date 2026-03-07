'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Felhasznalo_AjandekElozmeny', [
      { user_id: 1, ajandek_id: 1, keresesi_ido: new Date() },
      { user_id: 1, ajandek_id: 2, keresesi_ido: new Date() }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Felhasznalo_AjandekElozmeny', null, {});
  }
};
