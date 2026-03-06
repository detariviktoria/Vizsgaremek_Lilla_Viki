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
      from_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Felhasznalo",
          key: "user_id",
        },
      },
      to_user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Felhasznalo",
          key: "user_id",
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
          isEmail: {
            args: true,
            msg: "Érvénytelen email cím!",
          },
        },
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

