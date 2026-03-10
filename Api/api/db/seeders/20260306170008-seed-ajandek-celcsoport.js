'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [rows] = await queryInterface.sequelize.query('SELECT COUNT(*) as c FROM Ajandek_Celcsoport');
    if (rows[0].c > 0) return;
    await queryInterface.bulkInsert('Ajandek_Celcsoport', [
      { ajandek_id: 1, celcsoport_id: 2 }, { ajandek_id: 1, celcsoport_id: 5 },
      { ajandek_id: 2, celcsoport_id: 4 },
      { ajandek_id: 3, celcsoport_id: 1 }, { ajandek_id: 3, celcsoport_id: 2 },
      { ajandek_id: 4, celcsoport_id: 2 }, { ajandek_id: 4, celcsoport_id: 6 },
      { ajandek_id: 5, celcsoport_id: 2 }, { ajandek_id: 5, celcsoport_id: 4 },
      { ajandek_id: 6, celcsoport_id: 1 }, { ajandek_id: 6, celcsoport_id: 3 },
      { ajandek_id: 7, celcsoport_id: 4 },
      { ajandek_id: 8, celcsoport_id: 2 }, { ajandek_id: 8, celcsoport_id: 5 },
      { ajandek_id: 9, celcsoport_id: 2 }, { ajandek_id: 9, celcsoport_id: 5 },
      { ajandek_id: 10, celcsoport_id: 2 }, { ajandek_id: 10, celcsoport_id: 4 },
      { ajandek_id: 11, celcsoport_id: 2 }, { ajandek_id: 11, celcsoport_id: 5 },
      { ajandek_id: 12, celcsoport_id: 1 }, { ajandek_id: 12, celcsoport_id: 2 },
      { ajandek_id: 13, celcsoport_id: 2 }, { ajandek_id: 13, celcsoport_id: 7 },
      { ajandek_id: 14, celcsoport_id: 2 }, { ajandek_id: 14, celcsoport_id: 4 },
      { ajandek_id: 15, celcsoport_id: 5 }, { ajandek_id: 15, celcsoport_id: 6 },
      { ajandek_id: 16, celcsoport_id: 4 },
      { ajandek_id: 17, celcsoport_id: 5 }, { ajandek_id: 17, celcsoport_id: 7 },
      { ajandek_id: 18, celcsoport_id: 1 }, { ajandek_id: 18, celcsoport_id: 6 },
      { ajandek_id: 19, celcsoport_id: 4 }, { ajandek_id: 19, celcsoport_id: 2 },
      { ajandek_id: 20, celcsoport_id: 6 }, { ajandek_id: 20, celcsoport_id: 2 },
      { ajandek_id: 21, celcsoport_id: 2 }, { ajandek_id: 21, celcsoport_id: 5 },
      { ajandek_id: 22, celcsoport_id: 4 }, { ajandek_id: 22, celcsoport_id: 2 },
      { ajandek_id: 23, celcsoport_id: 6 }, { ajandek_id: 23, celcsoport_id: 2 },
      { ajandek_id: 24, celcsoport_id: 1 }, { ajandek_id: 24, celcsoport_id: 2 },
      { ajandek_id: 25, celcsoport_id: 1 }, { ajandek_id: 25, celcsoport_id: 5 },
      { ajandek_id: 26, celcsoport_id: 2 }, { ajandek_id: 26, celcsoport_id: 5 },
      { ajandek_id: 27, celcsoport_id: 2 }, { ajandek_id: 27, celcsoport_id: 7 },
      { ajandek_id: 28, celcsoport_id: 2 }, { ajandek_id: 28, celcsoport_id: 6 },
      { ajandek_id: 29, celcsoport_id: 2 }, { ajandek_id: 29, celcsoport_id: 5 },
      { ajandek_id: 30, celcsoport_id: 2 }, { ajandek_id: 30, celcsoport_id: 1 },
      { ajandek_id: 31, celcsoport_id: 2 }, { ajandek_id: 31, celcsoport_id: 5 },
      { ajandek_id: 32, celcsoport_id: 4 }, { ajandek_id: 32, celcsoport_id: 2 },
      { ajandek_id: 33, celcsoport_id: 6 }, { ajandek_id: 33, celcsoport_id: 2 },
      { ajandek_id: 34, celcsoport_id: 1 }, { ajandek_id: 34, celcsoport_id: 2 },
      { ajandek_id: 35, celcsoport_id: 1 }, { ajandek_id: 35, celcsoport_id: 5 },
      { ajandek_id: 36, celcsoport_id: 2 }, { ajandek_id: 36, celcsoport_id: 5 },
      { ajandek_id: 37, celcsoport_id: 2 }, { ajandek_id: 37, celcsoport_id: 7 },
      { ajandek_id: 38, celcsoport_id: 2 }, { ajandek_id: 38, celcsoport_id: 6 },
      { ajandek_id: 39, celcsoport_id: 2 }, { ajandek_id: 39, celcsoport_id: 5 },
      { ajandek_id: 40, celcsoport_id: 2 }, { ajandek_id: 40, celcsoport_id: 1 },
      { ajandek_id: 41, celcsoport_id: 2 }, { ajandek_id: 41, celcsoport_id: 5 },
      { ajandek_id: 42, celcsoport_id: 4 }, { ajandek_id: 42, celcsoport_id: 2 },
      { ajandek_id: 43, celcsoport_id: 6 }, { ajandek_id: 43, celcsoport_id: 2 },
      { ajandek_id: 44, celcsoport_id: 1 }, { ajandek_id: 44, celcsoport_id: 2 },
      { ajandek_id: 45, celcsoport_id: 1 }, { ajandek_id: 45, celcsoport_id: 5 },
      { ajandek_id: 46, celcsoport_id: 2 }, { ajandek_id: 46, celcsoport_id: 5 },
      { ajandek_id: 47, celcsoport_id: 2 }, { ajandek_id: 47, celcsoport_id: 7 },
      { ajandek_id: 48, celcsoport_id: 2 }, { ajandek_id: 48, celcsoport_id: 6 },
      { ajandek_id: 49, celcsoport_id: 2 }, { ajandek_id: 49, celcsoport_id: 5 },
      { ajandek_id: 50, celcsoport_id: 2 }, { ajandek_id: 50, celcsoport_id: 1 }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ajandek_Celcsoport', null, {});
  }
};
