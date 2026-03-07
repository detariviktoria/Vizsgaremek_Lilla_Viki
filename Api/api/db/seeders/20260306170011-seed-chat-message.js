'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('uzenet', [
      { from_user_id: 1, to_user_id: 2, message: 'Szia Lilla, küldtem neked egy ajándékötletet!', is_read: true, createdAt: new Date(), updatedAt: new Date() },
      { from_user_id: 2, to_user_id: 1, message: 'Szia Viki, köszi, megnézem!', is_read: false, createdAt: new Date(), updatedAt: new Date() },
      { from_user_id: 3, to_user_id: 1, message: 'Szia, tetszik az oldal!', is_read: false, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('uzenet', null, {});
  }
};
