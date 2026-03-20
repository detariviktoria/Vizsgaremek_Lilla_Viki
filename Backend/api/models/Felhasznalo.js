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
      },
      ajanlo_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      reset_token: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      reset_token_expires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      kep_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Felhasznalo",
      tableName: "Felhasznalo",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["name"],
          name: "user_name"
        },
        {
          unique: true,
          fields: ["email"],
          name: "user_email"
        }
      ],
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