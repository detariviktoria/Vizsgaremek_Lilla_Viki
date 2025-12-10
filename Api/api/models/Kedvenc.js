//Kedvenc.js
const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Felhasznalo_KedvencAjandek extends Model {}

  Felhasznalo_KedvencAjandek.init(
    {
      felhaszanlo_id: { type: DataTypes.INTEGER, primaryKey: true },
      ajandek_id: { type: DataTypes.INTEGER, primaryKey: true },
      mentve: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "Felhasznalo_KedvencAjandek",
      modelName: "Felhasznalo_KedvencAjandek",
      timestamps: false,
    }
  );

  return Felhasznalo_KedvencAjandek;
};
