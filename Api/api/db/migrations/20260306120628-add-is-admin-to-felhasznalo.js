'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('Felhasznalo');
    if (!tableInfo.is_admin) {
      await queryInterface.addColumn('Felhasznalo', 'is_admin', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Felhasznalo', 'is_admin');
  }
};
