const Game = require('../models/Game')

function create(game_name, game_creator, game_type) {
  return Game.create(game_name, game_creator, game_type);
}

module.exports = { create };