'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Ajandek_Stilus', [
      { ajandek_id: 1, stilus_id: 1 }, { ajandek_id: 10, stilus_id: 1 }, { ajandek_id: 44, stilus_id: 1 },
      { ajandek_id: 6, stilus_id: 2 }, { ajandek_id: 15, stilus_id: 2 }, { ajandek_id: 40, stilus_id: 2 },
      { ajandek_id: 13, stilus_id: 3 }, { ajandek_id: 14, stilus_id: 3 }, { ajandek_id: 21, stilus_id: 3 },
      { ajandek_id: 3, stilus_id: 4 }, { ajandek_id: 24, stilus_id: 4 }, { ajandek_id: 47, stilus_id: 4 },
      { ajandek_id: 7, stilus_id: 5 }, { ajandek_id: 14, stilus_id: 5 }, { ajandek_id: 16, stilus_id: 5 },
      { ajandek_id: 13, stilus_id: 6 }, { ajandek_id: 32, stilus_id: 6 }, { ajandek_id: 41, stilus_id: 6 },
      { ajandek_id: 8, stilus_id: 7 }, { ajandek_id: 47, stilus_id: 7 }, { ajandek_id: 50, stilus_id: 7 },
      { ajandek_id: 3, stilus_id: 8 }, { ajandek_id: 12, stilus_id: 8 }, { ajandek_id: 24, stilus_id: 8 },
      { ajandek_id: 6, stilus_id: 9 }, { ajandek_id: 28, stilus_id: 9 }, { ajandek_id: 40, stilus_id: 9 },
      { ajandek_id: 14, stilus_id: 10 }, { ajandek_id: 21, stilus_id: 10 }, { ajandek_id: 50, stilus_id: 10 },
      { ajandek_id: 5, stilus_id: 11 }, { ajandek_id: 11, stilus_id: 11 }, { ajandek_id: 46, stilus_id: 11 },
      { ajandek_id: 29, stilus_id: 12 }, { ajandek_id: 36, stilus_id: 12 }, { ajandek_id: 46, stilus_id: 12 },
      { ajandek_id: 12, stilus_id: 13 }, { ajandek_id: 44, stilus_id: 13 }, { ajandek_id: 47, stilus_id: 13 },
      { ajandek_id: 4, stilus_id: 14 }, { ajandek_id: 19, stilus_id: 14 }, { ajandek_id: 45, stilus_id: 14 },
      { ajandek_id: 3, stilus_id: 15 }, { ajandek_id: 24, stilus_id: 15 }, { ajandek_id: 48, stilus_id: 15 },
      { ajandek_id: 10, stilus_id: 16 }, { ajandek_id: 49, stilus_id: 16 }, { ajandek_id: 45, stilus_id: 16 },
      { ajandek_id: 21, stilus_id: 17 }, { ajandek_id: 41, stilus_id: 17 }, { ajandek_id: 49, stilus_id: 17 },
      { ajandek_id: 1, stilus_id: 18 }, { ajandek_id: 44, stilus_id: 18 }, { ajandek_id: 23, stilus_id: 18 },
      { ajandek_id: 5, stilus_id: 19 }, { ajandek_id: 30, stilus_id: 19 }, { ajandek_id: 27, stilus_id: 19 },
      { ajandek_id: 13, stilus_id: 20 }, { ajandek_id: 32, stilus_id: 20 }, { ajandek_id: 41, stilus_id: 20 }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ajandek_Stilus', null, {});
  }
};
