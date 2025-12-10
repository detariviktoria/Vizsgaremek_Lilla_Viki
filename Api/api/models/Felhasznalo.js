// Felhasznalo.js
const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  class Felhasznalo extends Model {}

  Felhasznalo.init(
    {
      felhaszanlo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      nev: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: "Érvénytelen email cím!",
          },
        },
      },

      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: "Felhasznalo",
      modelName: "Felhasznalo",
      timestamps: false,

      hooks: {
        beforeCreate: async (felhasznalo) => {
          if (felhasznalo.password && !felhasznalo.password.startsWith("$2")) {
            felhasznalo.password = await bcrypt.hash(felhasznalo.password, 10);
          }
        },
        beforeUpdate: async (felhasznalo) => {
          if (felhasznalo.changed("password") && !felhasznalo.password.startsWith("$2")) {
            felhasznalo.password = await bcrypt.hash(felhasznalo.password, 10);
          }
        },
      },
    }
  );

  return Felhasznalo;
};
