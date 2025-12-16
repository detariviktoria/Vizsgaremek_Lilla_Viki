const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Celcsoport extends Model {}

  Celcsoport.init(
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
      modelName: "Celcsoport",
      tableName: "Celcsoport",
      timestamps: false,
    }
  );

  return Celcsoport;
};
