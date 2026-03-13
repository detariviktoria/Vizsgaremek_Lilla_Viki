'use strict';
<<<<<<< HEAD
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {},
  async down(queryInterface, Sequelize) {}
=======

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ajandek_Celcsoport', {
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
      celcsoport_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Celcsoport',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ajandek_Celcsoport');
  }
>>>>>>> 748a7e6de3930400406bc2334a63185276cb7ffa
};
