'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Kuponok', [
      { user_id: 1, coupon_code: 'KU123', status: 'Nem felhasználva', discount: 1000, expiry_date: new Date('2025-12-31') },
      { user_id: 2, coupon_code: 'KU456', status: 'Felhasználva', discount: 1500, expiry_date: new Date('2025-11-30') },
      { user_id: 1, coupon_code: 'KU789', status: 'Nem felhasználva', discount: 2000, expiry_date: new Date('2026-01-15') }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Kuponok', null, {});
  }
};
