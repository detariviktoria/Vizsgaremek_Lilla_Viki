const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  class Felhasznalo extends Model {}

  Felhasznalo.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: "user_name",
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: "user_email",
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
      },
    },
    {
      sequelize,
      modelName: "Felhasznalo",
      tableName: "Felhasznalo",
      timestamps: false,
      hooks: {
        beforeCreate: async (felhasznalo) => {
          if (felhasznalo.password) {
            felhasznalo.password = await bcrypt.hash(felhasznalo.password, 10);
          }
        },
        beforeUpdate: async (felhasznalo) => {
          if (felhasznalo.changed("password")) {
            felhasznalo.password = await bcrypt.hash(felhasznalo.password, 10);
          }
        },
      },
    }
  );

  return Felhasznalo;
};
