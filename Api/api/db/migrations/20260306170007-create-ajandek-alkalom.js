'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ajandek_Alkalom', {
      ajandek_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Ajandek', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      alkalom_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Alkalom', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ajandek_Alkalom');
  }
};
