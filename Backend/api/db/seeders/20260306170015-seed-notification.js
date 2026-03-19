'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Ertesitesek', [
      {
        user_id: 1,
        message: 'Üdvözöljük az Ajándékajánlóban!',
        is_read: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        message: 'Kaptál egy új meghívót!',
        is_read: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        message: 'A profilod sikeresen elkészült.',
        is_read: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ertesitesek', null, {});
  }
};
