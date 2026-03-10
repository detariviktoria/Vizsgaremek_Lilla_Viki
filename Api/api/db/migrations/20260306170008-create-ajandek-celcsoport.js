'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ajandek_Celcsoport', {
      ajandek_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Ajandek', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      celcsoport_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Celcsoport', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ajandek_Celcsoport');
  }
};
