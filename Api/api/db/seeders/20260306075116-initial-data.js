'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Csak akkor szúrunk be, ha üres a tábla, vagy töröljük előtte
    await queryInterface.bulkDelete('Stilusok', null, {});
    await queryInterface.bulkDelete('Alkalom', null, {});
    await queryInterface.bulkDelete('Celcsoport', null, {});

    await queryInterface.bulkInsert('Stilusok', [
      { id: 1, nev: 'Vicces' },
      { id: 2, nev: 'Hasznos' },
      { id: 3, nev: 'Luxus' },
      { id: 4, nev: 'Kézműves' },
      { id: 5, nev: 'Romantikus' },
      { id: 6, nev: 'Technológias' },
      { id: 7, nev: 'Egyedi' },
      { id: 8, nev: 'Kreatív' },
      { id: 9, nev: 'Praktikus' },
      { id: 10, nev: 'Elegáns' },
      { id: 11, nev: 'Extrém' },
      { id: 12, nev: 'Sportos' },
      { id: 13, nev: 'Képzőművészeti' },
      { id: 14, nev: 'Gasztronómiai' },
      { id: 15, nev: 'DIY' },
      { id: 16, nev: 'Vintage' },
      { id: 17, nev: 'Zenei' },
      { id: 18, nev: 'Otthoni' },
      { id: 19, nev: 'Utazós' },
      { id: 20, nev: 'Trendkövető' }
    ], {});

    await queryInterface.bulkInsert('Alkalom', [
      { id: 1, nev: 'Születésnap' },
      { id: 2, nev: 'Karácsony' },
      { id: 3, nev: 'Valentin-nap' },
      { id: 4, nev: 'Anyák napja' },
      { id: 5, nev: 'Apák napja' },
      { id: 7, nev: 'Gyermeknap' },
      { id: 8, nev: 'Húsvét' },
      { id: 9, nev: 'Ballagás' },
      { id: 10, nev: 'Névnap' },
      { id: 11, nev: 'Mikulás' },
      { id: 12, nev: 'Karrier' },
      { id: 13, nev: 'Évforduló' },
      { id: 14, nev: 'Diplomaosztó' },
      { id: 15, nev: 'Házassági évforduló' },
      { id: 16, nev: 'Barátság napja' },
      { id: 17, nev: 'Új év' },
      { id: 19, nev: 'Köszönetnyilvánítás' },
      { id: 22, nev: 'Jubileum' },
      { id: 23, nev: 'Búcsúzkodó buli' },
      { id: 25, nev: 'Gyermek születés' }
    ], {});

    await queryInterface.bulkInsert('Celcsoport', [
      { id: 1, nev: 'Gyerekek' },
      { id: 2, nev: 'Felnőttek' },
      { id: 3, nev: 'Idősek' },
      { id: 4, nev: 'Párok' },
      { id: 5, nev: 'Barátok' },
      { id: 6, nev: 'Szülők' },
      { id: 7, nev: 'Kollégák' }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Celcsoport', null, {});
    await queryInterface.bulkDelete('Alkalom', null, {});
    await queryInterface.bulkDelete('Stilusok', null, {});
  }
};
