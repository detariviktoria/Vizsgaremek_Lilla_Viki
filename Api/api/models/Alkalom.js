const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Alkalom extends Model {}

  Alkalom.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nev: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Alkalom",
      tableName: "Alkalom",
      timestamps: false,
    }
  );

  return Alkalom;
};
