'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('Ajandek', ['nev']);
    await queryInterface.addIndex('Ajandek', ['kategoria']);
    await queryInterface.addIndex('Ajandek', ['ar']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Ajandek', ['nev']);
    await queryInterface.removeIndex('Ajandek', ['kategoria']);
    await queryInterface.removeIndex('Ajandek', ['ar']);
  }
};
