'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ajandek', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nev: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      leiras: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ar: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      kategoria: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      image_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      link_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      }
    });

    // Indexek hozzáadása a teljesítmény érdekében
    await queryInterface.addIndex('Ajandek', ['ar']);
    await queryInterface.addIndex('Ajandek', ['kategoria']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ajandek');
  }
};
