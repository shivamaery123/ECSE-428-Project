const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const Game = sequelize.define("games", {
  game_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  game_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  game_creator: { 
      type: DataTypes.STRING(100), 
      allowNull: false 
  },

  game_type: {
    type: DataTypes.ENUM,
    values: ['Action', 'Adventure', 'Strategy', 'Racing', 'Sports', 'RPG']
  },

  release_date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  }
});

module.exports = Game;