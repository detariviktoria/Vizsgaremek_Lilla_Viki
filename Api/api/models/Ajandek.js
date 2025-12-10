//Ajandek.js
const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Ajandek extends Model {}

  Ajandek.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nev: DataTypes.STRING(100),
      leiras: DataTypes.TEXT,
      ar: DataTypes.INTEGER,
      kategoria: DataTypes.ENUM("tárgy", "élmény"),
      stilus_id: DataTypes.INTEGER,
      image_url: DataTypes.STRING(255),
      link_url: DataTypes.STRING(255),
    },
    {
      sequelize,
      tableName: "Ajandek",
      modelName: "Ajandek",
      timestamps: false,
    }
  );

  return Ajandek;
};
