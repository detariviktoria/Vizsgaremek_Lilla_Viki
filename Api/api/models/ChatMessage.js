const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ChatMessage = sequelize.define('ChatMessage', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    from_user_id: { type: DataTypes.INTEGER, allowNull: false },
    to_user_id: { type: DataTypes.INTEGER, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'chat_messages',
    timestamps: false
  });
  return ChatMessage;
};
