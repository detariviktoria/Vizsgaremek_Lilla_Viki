'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ajandek_Stilus', {
      ajandek_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Ajandek',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      stilus_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Stilusok',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ajandek_Stilus');
  }
};
