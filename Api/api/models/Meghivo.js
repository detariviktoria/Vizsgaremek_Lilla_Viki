const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Meghivo extends Model {}

  Meghivo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      kuldo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Felhasznalo", key: "user_id" },
      },
      meghivott_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "Felhasznalo", key: "user_id" },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      kupon_kod: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true
      },
      lejarat_datum: {
        type: DataTypes.DATE,
        allowNull: true
      },
      kuldve_datum: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      elfogadva: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      elfogadva_datum: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Meghivo",
      tableName: "Meghivo",
      timestamps: false,
    }
  );

  return Meghivo;
};
