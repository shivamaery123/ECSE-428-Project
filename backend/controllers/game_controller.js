const Game = require('../models/Game')

const createGame = async (req, res) => {
    try {
      const { game_name, game_creator, game_type } = req.body;
      const game = await Game.create({ game_name, game_creator, game_type });
      res.status(201).json({
        status: "Success",
        message: "Game created successfully",
        data: {
          game: game,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: `Game was not created, error: ${err}`,
      });
    }
  };

const get_all_games = async (req, res) => { 
    try {
        const games = await Game.findAll();
        res.status(201).json({
        status: "Success",
        message: "Games retrieved successfully",
        data: {
            games: games,
        },
        });
    } catch (err) {
        res.status(400).json({
        status: "Failed",
        message: `Games were not successfuly fetched, error: ${err}`,
        });
    }
};

const get_game = async(req,res) => {
    try {
        const query = req.body
        var game = null

        if('game_name' in query) {
        game = await Game.findOne({
            where: {
            game_name: query.game_name
            }
        });
        } else if('id' in query) {
        game = await Game.findOne({
            where: {
            game_id: query.id
            }
        });
        } else throw new Error(`Invalid query`)


        if(game == null) {
        res.status(404).json({
            status: "Failed",
            message: `Game does not exist.`
        });
        } else {
        res.status(201).json({
            status: "Success",
            message: "Game retrieved successfully.",
            data: {
            game: game
            },
        });
        }

    } catch (err) {
        res.status(400).json({
        status: "Failed",
        message: `Game was not successfuly fetched, ${err}`,
        });
    }
}

module.exports = { createGame, get_all_games, get_game };