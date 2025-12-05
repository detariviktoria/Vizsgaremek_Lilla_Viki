const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Stilus extends Model {}

  Stilus.init(
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
      modelName: "Stilus",
      tableName: "Stilusok",
      timestamps: false,
    }
  );

  return Stilus;
};
