'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Stilusok', [
      { id: 1, nev: 'Vicces' }, { id: 2, nev: 'Hasznos' }, { id: 3, nev: 'Luxus' }, { id: 4, nev: 'Kézműves' },
      { id: 5, nev: 'Romantikus' }, { id: 6, nev: 'Technológias' }, { id: 7, nev: 'Egyedi' }, { id: 8, nev: 'Kreatív' },
      { id: 9, nev: 'Praktikus' }, { id: 10, nev: 'Elegáns' }, { id: 11, nev: 'Extrém' }, { id: 12, nev: 'Sportos' },
      { id: 13, nev: 'Képzőművészeti' }, { id: 14, nev: 'Gasztronómiai' }, { id: 15, nev: 'DIY' }, { id: 16, nev: 'Vintage' },
      { id: 17, nev: 'Zenei' }, { id: 18, nev: 'Otthoni' }, { id: 19, nev: 'Utazós' }, { id: 20, nev: 'Trendkövető' }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stilusok', null, {});
  }
};
