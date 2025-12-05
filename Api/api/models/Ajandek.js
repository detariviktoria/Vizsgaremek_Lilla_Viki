const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Ajandek extends Model {}

  Ajandek.init(
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
      leiras: {
        type: DataTypes.TEXT,
      },
      ar: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      kategoria: {

        type: DataTypes.ENUM("tárgy", "élmény"),

        allowNull: false,

      },

      image_url: {

        type: DataTypes.STRING(255),

      },
      link_url: {
        type: DataTypes.STRING(255),
      },
    },
    {
      sequelize,
      modelName: "Ajandek",
      tableName: "Ajandek",
      timestamps: false,
    }
  );

  return Ajandek;
};