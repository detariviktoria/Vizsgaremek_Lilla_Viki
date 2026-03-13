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
    await queryInterface.createTable('Ajandek', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nev: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      leiras: {
        type: Sequelize.TEXT,
      },
      ar: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      kategoria: {
        type: Sequelize.ENUM("tárgy", "élmény"),
        allowNull: false,
      },
      image_url: {
        type: Sequelize.STRING(255),
      },
      link_url: {
        type: Sequelize.STRING(255),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ajandek');
  }
>>>>>>> 748a7e6de3930400406bc2334a63185276cb7ffa
};
