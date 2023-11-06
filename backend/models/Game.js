/**
 * This file is used to setup model User of the database so that we can store users
 */
const { Sequelize, DataTypes, STRING } = require("sequelize");
const sequelize = require("../config/database.js");
const User = require("./User.js");

// User model

const Game = sequelize.define("game", {
    game_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    });

    Game.associate = (models) => {
        // Define associations (e.g., a foreign key to User table)
        Game.belongsTo(models.User, { foreignKey: 'user_id' });
    },




module.exports = Game;
