//Alkalom.js
const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Alkalom extends Model {}

  Alkalom.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nev: DataTypes.STRING(100),
    },
    {
      sequelize,
      tableName: "Alkalom",
      modelName: "Alkalom",
      timestamps: false,
    }
  );

  return Alkalom;
};
