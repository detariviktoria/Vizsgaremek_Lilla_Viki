const { Sequelize } = require("sequelize");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../../.env"),
});

const sequelize = new Sequelize(
  process.env.DB_NAME || "vizsgaremek",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    dialect: process.env.DB_DIALECT || "mysql",
    host: process.env.DB_HOST || "localhost",
    logging: false,
  }
);

const models = require("../models")(sequelize);

module.exports = {
  Sequelize,
  sequelize,
  ...models,
};
