'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Meghivo', {
      meghivo_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      kuldo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Felhasznalo',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      kuldve_datum: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      elfogadva: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      elfogadva_datum: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Meghivo');
  }
};
