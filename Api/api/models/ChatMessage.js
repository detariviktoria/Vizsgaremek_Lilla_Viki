const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class ChatMessage extends Model {}

  ChatMessage.init(
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
        allowNull: false,
        references: {
          model: "Felhasznalo",
          key: "user_id",
        },
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "ChatMessage",
      tableName: "uzenet",
      timestamps: false,
    }
  );

  return ChatMessage;
};

