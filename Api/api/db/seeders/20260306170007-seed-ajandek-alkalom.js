'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [rows] = await queryInterface.sequelize.query('SELECT COUNT(*) as c FROM Ajandek_Alkalom');
    if (rows[0].c > 0) return;
    await queryInterface.bulkInsert('Ajandek_Alkalom', [
      { ajandek_id: 1, alkalom_id: 1 }, { ajandek_id: 1, alkalom_id: 2 }, { ajandek_id: 1, alkalom_id: 10 },
      { ajandek_id: 2, alkalom_id: 3 }, { ajandek_id: 2, alkalom_id: 13 }, { ajandek_id: 2, alkalom_id: 15 },
      { ajandek_id: 3, alkalom_id: 1 }, { ajandek_id: 3, alkalom_id: 6 },
      { ajandek_id: 4, alkalom_id: 1 }, { ajandek_id: 4, alkalom_id: 2 },
      { ajandek_id: 5, alkalom_id: 1 }, { ajandek_id: 5, alkalom_id: 13 },
      { ajandek_id: 6, alkalom_id: 2 }, { ajandek_id: 6, alkalom_id: 11 },
      { ajandek_id: 7, alkalom_id: 3 }, { ajandek_id: 7, alkalom_id: 13 },
      { ajandek_id: 8, alkalom_id: 1 }, { ajandek_id: 8, alkalom_id: 10 },
      { ajandek_id: 9, alkalom_id: 2 }, { ajandek_id: 9, alkalom_id: 3 },
      { ajandek_id: 10, alkalom_id: 1 }, { ajandek_id: 10, alkalom_id: 13 },
      { ajandek_id: 11, alkalom_id: 1 }, { ajandek_id: 11, alkalom_id: 16 },
      { ajandek_id: 12, alkalom_id: 1 }, { ajandek_id: 12, alkalom_id: 6 },
      { ajandek_id: 13, alkalom_id: 1 }, { ajandek_id: 13, alkalom_id: 2 },
      { ajandek_id: 14, alkalom_id: 3 }, { ajandek_id: 14, alkalom_id: 10 },
      { ajandek_id: 15, alkalom_id: 2 }, { ajandek_id: 15, alkalom_id: 16 },
      { ajandek_id: 16, alkalom_id: 13 }, { ajandek_id: 16, alkalom_id: 22 },
      { ajandek_id: 17, alkalom_id: 1 }, { ajandek_id: 17, alkalom_id: 23 },
      { ajandek_id: 18, alkalom_id: 8 }, { ajandek_id: 18, alkalom_id: 25 },
      { ajandek_id: 19, alkalom_id: 13 }, { ajandek_id: 19, alkalom_id: 15 },
      { ajandek_id: 20, alkalom_id: 6 }, { ajandek_id: 20, alkalom_id: 19 },
      { ajandek_id: 21, alkalom_id: 1 }, { ajandek_id: 21, alkalom_id: 16 },
      { ajandek_id: 22, alkalom_id: 3 }, { ajandek_id: 22, alkalom_id: 13 },
      { ajandek_id: 23, alkalom_id: 8 }, { ajandek_id: 23, alkalom_id: 6 },
      { ajandek_id: 24, alkalom_id: 1 }, { ajandek_id: 24, alkalom_id: 2 },
      { ajandek_id: 25, alkalom_id: 1 }, { ajandek_id: 25, alkalom_id: 8 },
      { ajandek_id: 26, alkalom_id: 1 }, { ajandek_id: 26, alkalom_id: 17 },
      { ajandek_id: 27, alkalom_id: 1 }, { ajandek_id: 27, alkalom_id: 14 },
      { ajandek_id: 28, alkalom_id: 2 }, { ajandek_id: 28, alkalom_id: 8 },
      { ajandek_id: 29, alkalom_id: 1 }, { ajandek_id: 29, alkalom_id: 17 },
      { ajandek_id: 30, alkalom_id: 1 }, { ajandek_id: 30, alkalom_id: 2 },
      { ajandek_id: 31, alkalom_id: 1 }, { ajandek_id: 31, alkalom_id: 2 },
      { ajandek_id: 32, alkalom_id: 3 }, { ajandek_id: 32, alkalom_id: 13 },
      { ajandek_id: 33, alkalom_id: 8 }, { ajandek_id: 33, alkalom_id: 6 },
      { ajandek_id: 34, alkalom_id: 1 }, { ajandek_id: 34, alkalom_id: 2 },
      { ajandek_id: 35, alkalom_id: 1 }, { ajandek_id: 35, alkalom_id: 8 },
      { ajandek_id: 36, alkalom_id: 1 }, { ajandek_id: 36, alkalom_id: 17 },
      { ajandek_id: 37, alkalom_id: 1 }, { ajandek_id: 37, alkalom_id: 14 },
      { ajandek_id: 38, alkalom_id: 2 }, { ajandek_id: 38, alkalom_id: 8 },
      { ajandek_id: 39, alkalom_id: 1 }, { ajandek_id: 39, alkalom_id: 17 },
      { ajandek_id: 40, alkalom_id: 1 }, { ajandek_id: 40, alkalom_id: 2 },
      { ajandek_id: 41, alkalom_id: 1 }, { ajandek_id: 41, alkalom_id: 2 },
      { ajandek_id: 42, alkalom_id: 3 }, { ajandek_id: 42, alkalom_id: 13 },
      { ajandek_id: 43, alkalom_id: 8 }, { ajandek_id: 43, alkalom_id: 6 },
      { ajandek_id: 44, alkalom_id: 1 }, { ajandek_id: 44, alkalom_id: 2 },
      { ajandek_id: 45, alkalom_id: 1 }, { ajandek_id: 45, alkalom_id: 8 },
      { ajandek_id: 46, alkalom_id: 1 }, { ajandek_id: 46, alkalom_id: 17 },
      { ajandek_id: 47, alkalom_id: 1 }, { ajandek_id: 47, alkalom_id: 14 },
      { ajandek_id: 48, alkalom_id: 2 }, { ajandek_id: 48, alkalom_id: 8 },
      { ajandek_id: 49, alkalom_id: 1 }, { ajandek_id: 49, alkalom_id: 17 },
      { ajandek_id: 50, alkalom_id: 1 }, { ajandek_id: 50, alkalom_id: 2 }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ajandek_Alkalom', null, {});
  }
};
