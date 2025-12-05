const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Kupon extends Model {}

  Kupon.init(
    {
      coupon_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      coupon_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      expiry_date: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Kupon",
      tableName: "Kuponok",
      timestamps: false,
    }
  );

  return Kupon;
};
