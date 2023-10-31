const express = require("express");
const game_router = express.Router();
const { createGame, get_all_games, get_game } = require('../controllers/game_controller');

game_router.post('/create', createGame);
game_router.get('/all', get_all_games);
game_router.get('/user', get_game);

module.exports = game_router;