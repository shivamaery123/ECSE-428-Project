/**
 * This file is used to setup model User of the database so that we can store users
 */

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

// User model

const User = sequelize.define("users", {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  email: { type: DataTypes.STRING(100), allowNull: false },

  password: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
});

module.exports = User;
