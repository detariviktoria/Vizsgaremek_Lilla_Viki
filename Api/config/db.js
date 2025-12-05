require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DbError } = require("../api/errors");
const path = require("path");

// Ellenőrizzük, hogy a .env fájl be van-e töltve
const dbName = process.env.DB_NAME || 'vizsgaremek';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || 'localhost';
const dbDialect = process.env.DB_DIALECT || 'mysql';

if (!dbDialect) {
  console.error('❌ Hiba: A DB_DIALECT nincs beállítva a .env fájlban!');
  console.error('Kérlek, hozd létre az Api/.env fájlt a következő tartalommal:');
  console.error('DB_HOST=localhost');
  console.error('DB_USER=root');
  console.error('DB_PASSWORD=');
  console.error('DB_NAME=vizsgaremek');
  console.error('DB_DIALECT=mysql');
  process.exit(1);
}

// console.log('📋 Adatbázis konfiguráció:');
// console.log(`   Host: ${dbHost}`);
// console.log(`   User: ${dbUser}`);
// console.log(`   Database: ${dbName}`);
// console.log(`   Dialect: ${dbDialect}`);

const sequelize = new Sequelize(
  dbName,
  dbUser,
  dbPassword,
  {
    host: dbHost,
    dialect: dbDialect,
    logging: false,
  }
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

(async () => {
  try {
    console.log("Adatbázis szinkronizálása folyamatban...");
    await db.sequelize.sync({ alter: false });
    console.log("Adatbázis szinkronizálása sikeres!");
  } catch (error) {
    console.error("Adatbázis szinkronizálási hiba:", error);
    throw new DbError("Nem sikerült az adatbázist szinkronizálni!");
  }
})();

module.exports = db;