'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {},
  async down(queryInterface, Sequelize) {}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Felhasznalo', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      ajanlo_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      reset_token: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      reset_token_expires: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      kep_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null
      }
========
>>>>>>>> 748a7e6de3930400406bc2334a63185276cb7ffa:Api/api/db/migrations/20260306074821-create-felhasznalo.js
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Felhasznalo');
};
