'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Meghivo', [
      { 
        kuldo_id: 1, 
        meghivott_id: 2,
        email: 'lilla@mail.com', 
        kupon_kod: null,
        lejarat_datum: null,
        elfogadva: true, 
        elfogadva_datum: new Date(), 
        kuldve_datum: new Date() 
      },
      { 
        kuldo_id: 1, 
        meghivott_id: null,
        email: 'barat@example.com', 
        kupon_kod: null,
        lejarat_datum: null,
        elfogadva: false, 
        kuldve_datum: new Date() 
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Meghivo', null, {});
  }
};
