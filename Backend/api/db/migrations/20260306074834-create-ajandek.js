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

    await queryInterface.addIndex('Ajandek', ['ar'], {
      name: 'idx_ajandek_ar'
    });
    await queryInterface.addIndex('Ajandek', ['kategoria'], {
      name: 'idx_ajandek_kategoria'
    });
    await queryInterface.addIndex('Ajandek', ['nev'], {
      name: 'idx_ajandek_nev'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Ajandek', 'idx_ajandek_ar');
    await queryInterface.removeIndex('Ajandek', 'idx_ajandek_kategoria');
    await queryInterface.removeIndex('Ajandek', 'idx_ajandek_nev');
    await queryInterface.dropTable('Ajandek');
  }
};