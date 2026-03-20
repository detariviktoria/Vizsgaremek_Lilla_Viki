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
        type: DataTypes.STRING(255),
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
      indexes: [
        {
          name: "idx_ajandek_ar",
          fields: ["ar"],
        },
        {
          name: "idx_ajandek_kategoria",
          fields: ["kategoria"],
        },
        {
          name: "idx_ajandek_nev",
          fields: ["nev"],
        },
      ],
    }
  );

  return Ajandek;
};