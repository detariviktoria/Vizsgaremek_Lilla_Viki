const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Gyujtemeny extends Model {}

  Gyujtemeny.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      felhasznalo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nev: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Gyujtemeny",
      tableName: "Gyujtemeny",
      timestamps: false,
    }
  );

  return Gyujtemeny;
};
