'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Felhasznalo_KedvencAjandek', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Felhasznalo',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
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
      mentve: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Felhasznalo_KedvencAjandek');
  }
};
