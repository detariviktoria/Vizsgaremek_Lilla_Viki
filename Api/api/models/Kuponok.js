// Kuponok.js
const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Kuponok extends Model {}

  Kuponok.init(
    {
      coupon_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      felhasznalo_id: DataTypes.INTEGER,
      coupon_code: DataTypes.STRING(50),
      status: DataTypes.STRING(50),
      discount: DataTypes.INTEGER,
      expiry_date: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "Kuponok",
      modelName: "Kuponok",
      timestamps: false,
    }
  );

  return Kuponok;
};
