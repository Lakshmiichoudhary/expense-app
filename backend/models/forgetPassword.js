const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const User = require("./user");

const ForgotPassword = sequelize.define("ForgotPasswordRequests", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

ForgotPassword.belongsTo(User, { foreignKey: "userId" });
User.hasMany(ForgotPassword, { foreignKey: "userId" });

module.exports = ForgotPassword;
