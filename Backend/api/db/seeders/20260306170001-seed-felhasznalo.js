'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Felhasznalo', [
      { user_id: 1, name: 'Viktória', email: 'viktoria@mail.com', password: await bcrypt.hash('pass123', 10), kep_url: 'Viktoria.jpg', is_admin: true },
      { user_id: 2, name: 'Lilla', email: 'lilla@mail.com', password: await bcrypt.hash('pass456', 10), kep_url: 'Lilla.jpg', is_admin: true },
      { user_id: 3, name: 'Beáta', email: 'beata@mail.com', password: await bcrypt.hash('pass789', 10), kep_url: 'Beata.jpg' },
      { user_id: 4, name: 'Anna', email: 'anna@mail.com', password: await bcrypt.hash('pass321', 10), kep_url: 'Anna.jpg' },
      { user_id: 5, name: 'Flóra', email: 'flora@mail.com', password: await bcrypt.hash('pass654', 10), kep_url: 'Flora.jpg' },
      { user_id: 6, name: 'Boglárka', email: 'boglarka@mail.com', password: await bcrypt.hash('pass987', 10), kep_url: 'Boglarka.jpg' },
      { user_id: 7, name: 'Csilla', email: 'csilla@mail.com', password: await bcrypt.hash('pass741', 10), kep_url: 'Csilla.jpg' },
      { user_id: 8, name: 'Erika', email: 'erika@mail.com', password: await bcrypt.hash('pass852', 10), kep_url: 'Erika.jpg' },
      { user_id: 9, name: 'Csenge', email: 'csenge@mail.com', password: await bcrypt.hash('pass963', 10), kep_url: 'Csenge.jpg' },
      { user_id: 10, name: 'Bianka', email: 'bianka@mail.com', password: await bcrypt.hash('pass159', 10), kep_url: 'Bianka.jpg' },
      { user_id: 11, name: 'Janka', email: 'janka@mail.com', password: await bcrypt.hash('pass753', 10), kep_url: 'Janka.jpg' },
      { user_id: 12, name: 'Odett', email: 'odett@mail.com', password: await bcrypt.hash('pass456', 10), kep_url: 'Odett.jpg' },
      { user_id: 13, name: 'Nóra', email: 'nora@mail.com', password: await bcrypt.hash('pass852', 10), kep_url: 'Nora.jpg' },
      { user_id: 14, name: 'Réka', email: 'reka@mail.com', password: await bcrypt.hash('pass369', 10), kep_url: 'Reka.jpg' },
      { user_id: 15, name: 'Judit', email: 'judit@mail.com', password: await bcrypt.hash('pass147', 10), kep_url: 'Judit.jpg' }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Felhasznalo', null, {});
  }
};
