'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Felhasznalo', [
      { user_id: 1, name: 'Viktória', email: 'viktoria@mail.com', password: await bcrypt.hash('pass123', 10) },
      { user_id: 2, name: 'Lilla', email: 'lilla@mail.com', password: await bcrypt.hash('pass456', 10) },
      { user_id: 3, name: 'Gábor', email: 'gabor@mail.com', password: await bcrypt.hash('pass789', 10) },
      { user_id: 4, name: 'Anna', email: 'anna@mail.com', password: await bcrypt.hash('pass321', 10) },
      { user_id: 5, name: 'Tamás', email: 'tamas@mail.com', password: await bcrypt.hash('pass654', 10) },
      { user_id: 6, name: 'Katalin', email: 'katalin@mail.com', password: await bcrypt.hash('pass987', 10) },
      { user_id: 7, name: 'Miklós', email: 'miklos@mail.com', password: await bcrypt.hash('pass741', 10) },
      { user_id: 8, name: 'Eszter', email: 'eszter@mail.com', password: await bcrypt.hash('pass852', 10) },
      { user_id: 9, name: 'Zoltán', email: 'zoltan@mail.com', password: await bcrypt.hash('pass963', 10) },
      { user_id: 10, name: 'Judit', email: 'judit@mail.com', password: await bcrypt.hash('pass159', 10) },
      { user_id: 11, name: 'Péter', email: 'peter@mail.com', password: await bcrypt.hash('pass753', 10) },
      { user_id: 12, name: 'Dóra', email: 'dora@mail.com', password: await bcrypt.hash('pass456', 10) },
      { user_id: 13, name: 'Balázs', email: 'balazs@mail.com', password: await bcrypt.hash('pass852', 10) },
      { user_id: 14, name: 'Réka', email: 'reka@mail.com', password: await bcrypt.hash('pass369', 10) },
      { user_id: 15, name: 'András', email: 'andras@mail.com', password: await bcrypt.hash('pass147', 10) }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Felhasznalo', null, {});
  }
};
