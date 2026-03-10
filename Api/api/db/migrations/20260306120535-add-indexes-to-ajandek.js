'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try { await queryInterface.addIndex('Ajandek', ['nev']); } catch (e) {}
    try { await queryInterface.addIndex('Ajandek', ['kategoria']); } catch (e) {}
    try { await queryInterface.addIndex('Ajandek', ['ar']); } catch (e) {}
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Ajandek', ['nev']);
    await queryInterface.removeIndex('Ajandek', ['kategoria']);
    await queryInterface.removeIndex('Ajandek', ['ar']);
  }
};
