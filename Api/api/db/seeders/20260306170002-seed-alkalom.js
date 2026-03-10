'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [rows] = await queryInterface.sequelize.query('SELECT COUNT(*) as c FROM Alkalom');
    if (rows[0].c > 0) return;
    await queryInterface.bulkInsert('Alkalom', [
      { id: 1, nev: 'Születésnap' }, { id: 2, nev: 'Karácsony' }, { id: 3, nev: 'Valentin-nap' }, { id: 4, nev: 'Anyák napja' },
      { id: 5, nev: 'Apák napja' }, { id: 6, nev: 'Anyák napja' }, { id: 7, nev: 'Gyermeknap' }, { id: 8, nev: 'Húsvét' },
      { id: 9, nev: 'Ballagás' }, { id: 10, nev: 'Névnap' }, { id: 11, nev: 'Mikulás' }, { id: 12, nev: 'Karrier' },
      { id: 13, nev: 'Évforduló' }, { id: 14, nev: 'Diplomaosztó' }, { id: 15, nev: 'Házassági évforduló' },
      { id: 16, nev: 'Barátság napja' }, { id: 17, nev: 'Új év' }, { id: 18, nev: 'Anyák napja' },
      { id: 19, nev: 'Köszönetnyilvánítás' }, { id: 20, nev: 'Karácsony' }, { id: 21, nev: 'Gyermeknap' },
      { id: 22, nev: 'Jubileum' }, { id: 23, nev: 'Búcsúzkodó buli' }, { id: 24, nev: 'Ballagás' }, { id: 25, nev: 'Gyermek születés' }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Alkalom', null, {});
  }
};
