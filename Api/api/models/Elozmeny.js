// Elozmeny.js
const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Felhasznalo_AjandekElozmeny extends Model {}

  Felhasznalo_AjandekElozmeny.init(
    {
      felhasznalo_id: { type: DataTypes.INTEGER, primaryKey: true },
      ajandek_id: { type: DataTypes.INTEGER, primaryKey: true },
      keresesi_ido: { type: DataTypes.DATE,  defaultValue: DataTypes.NOW},
    },
    {
      sequelize,
      tableName: "Felhasznalo_AjandekElozmeny",
      modelName: "Felhasznalo_AjandekElozmeny",
      timestamps: false,
      
    }
  );

  return Felhasznalo_AjandekElozmeny;
};
