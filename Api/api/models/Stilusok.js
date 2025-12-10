// Stilusok.js
const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Stilusok extends Model {}

  Stilusok.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nev: DataTypes.STRING(100),
    },
    {
      sequelize,
      modelName: "Stilusok",
      tableName: "Stilusok",
      timestamps: false,
    }
  );

  return Stilusok;
};
