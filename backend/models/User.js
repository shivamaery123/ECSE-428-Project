/**
 * This file is used to setup model User of the database so that we can store users
 */

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
//const GameHistory = require("./Game.js");

const ARRAY_STRING = DataTypes.JSON;

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

  email: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },

  password: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },

  game_history: {
    type: ARRAY_STRING,
    allowNull: false,
    defaultValue: "[]",
    get() {
      const rawValue = this.getDataValue("game_history");
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue("game_history", JSON.stringify(value));
    },
  },

  game_genre_preference: {
    type: ARRAY_STRING,
    allowNull:false,
    defaultValue:"[]",    get() {
      const rawValue = this.getDataValue("game_genre_preference");
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue("game_genre_preference", JSON.stringify(value));
    },
  }
});

module.exports = User;
