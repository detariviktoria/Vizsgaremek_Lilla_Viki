const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Notification extends Model {}

  Notification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Felhasznalo', key: 'user_id' }
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: "Notification",
      tableName: "Ertesitesek",
      timestamps: true
    }
  );

  return Notification;
};
