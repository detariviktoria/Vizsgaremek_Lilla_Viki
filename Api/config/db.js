require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DbError } = require("../api/errors");
const path = require("path");
const env = process.env.NODE_ENV || 'development';
const config = require('./config.js')[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const models = require("../api/models")(sequelize);

const db = {
  Sequelize,
  sequelize,
  ...models,
};

(async () => {
  try {
    console.log("Adatbázishoz próbálok csatlakozni...");
    await db.sequelize.authenticate();
    console.log("Sikeresen csatlakoztunk az adatbázishoz!");
  } catch (error) {
    console.error("Adatbázis kapcsolat hiba:", error);
    throw new DbError("Nem sikerült az adatbázishoz csatlakozni!");
  }
})();



module.exports = db;