'use strict';

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
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
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
    });

    await queryInterface.addIndex('Felhasznalo', ['name'], {
      unique: true,
      name: 'user_name'
    });
    await queryInterface.addIndex('Felhasznalo', ['email'], {
      unique: true,
      name: 'user_email'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Felhasznalo', 'user_name');
    await queryInterface.removeIndex('Felhasznalo', 'user_email');
    await queryInterface.dropTable('Felhasznalo');
  }
};
