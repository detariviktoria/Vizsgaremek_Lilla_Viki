'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add columns to Meghivo table
    const tableInfo = await queryInterface.describeTable('Meghivo');
    
    if (!tableInfo.meghivott_id) {
      await queryInterface.addColumn('Meghivo', 'meghivott_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Felhasznalo', key: 'user_id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
    
    if (!tableInfo.kupon_kod) {
      await queryInterface.addColumn('Meghivo', 'kupon_kod', {
        type: Sequelize.STRING(20),
        allowNull: true,
        unique: true
      });
    }
    
    if (!tableInfo.lejarat_datum) {
      await queryInterface.addColumn('Meghivo', 'lejarat_datum', {
        type: Sequelize.DATE,
        allowNull: true
      });
    }

    // Create Ertesitesek table if not exists
    const tables = await queryInterface.showAllTables();
    if (!tables.includes('Ertesitesek')) {
      await queryInterface.createTable('Ertesitesek', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Felhasznalo', key: 'user_id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        message: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        is_read: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        }
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Meghivo', 'meghivott_id');
    await queryInterface.removeColumn('Meghivo', 'kupon_kod');
    await queryInterface.removeColumn('Meghivo', 'lejarat_datum');
    await queryInterface.dropTable('Ertesitesek');
  }
};
