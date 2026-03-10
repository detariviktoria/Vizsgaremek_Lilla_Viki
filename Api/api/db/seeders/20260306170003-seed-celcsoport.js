'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [rows] = await queryInterface.sequelize.query('SELECT COUNT(*) as c FROM Celcsoport');
    if (rows[0].c > 0) return;
    await queryInterface.bulkInsert('Celcsoport', [
      { id: 1, nev: 'Gyerekek' }, { id: 2, nev: 'Felnőttek' }, { id: 3, nev: 'Idősek' }, { id: 4, nev: 'Párok' },
      { id: 5, nev: 'Barátok' }, { id: 6, nev: 'Szülők' }, { id: 7, nev: 'Kollégák' }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Celcsoport', null, {});
  }
};
