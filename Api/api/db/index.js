const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

const models = require("../models")(sequelize);  // models/index.js export: (sequelize) => { ... }

const db = { sequelize, Sequelize, ...models };

// Szinkronizálás (teszt/dev környezetben ok, élesben óvatosan!)
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ DB connected");
    await db.sequelize.sync({ alter: true });
    console.log("✅ DB synchronized");
  } catch (err) {
    console.error(err);
  }
})();

module.exports = db;