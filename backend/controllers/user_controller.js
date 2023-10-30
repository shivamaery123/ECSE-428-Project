const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).json({
      status: "Success",
      message: "User created successfully",
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: `User was not created, error: ${err}`,
    });
  }
};

const get_all_users = async (req, res) => { 
  try {
    const users = await User.findAll();
    res.status(201).json({
      status: "Success",
      message: "Users retrieved successfully",
      data: {
        users: users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: `Users were not successfuly fetched, error: ${err}`,
    });
  }
};

const get_user = async(req,res) => {
  try {
    const query = req.query
    var user = null

    if('email' in query) {
      user = await User.findOne({
        where: {
          email: query.email
        }
      });
    } else if('id' in query) {
      user = await User.findOne({
        where: {
          user_id: query.id
        }
      });
    } else throw new Error("Invalid query")


    if(user == null) {
      res.status(404).json({
        status: "Failed",
        message: `User does not exist.`
      });
    } else {
      res.status(201).json({
        status: "Success",
        message: "User retrieved successfully.",
        data: {
          user: user
        },
      });
    }

  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: `User was not successfuly fetched, ${err}`,
    });
  }
}

const addGameToHistory= async (req, res) => {

  try{
    //getting userID and game from the request
    const userId= req.body.user_id;
    const game= req.body.game; //NOTE: MIGHT NEED TO BE CHANGED BASED ON THE GAME MODEL

    //Fetching the respective user from the database
    const user= await User, findOne({ where: { user_id: userId } });

    if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found."
            });
        }
  
    let gameHistory = JSON.parse(user.game_history); 
    gameHistory.push(game);

    await user.update({ game_history: JSON.stringify(gameHistory) });

    res.status(200).json({
            status: "Success",
            message: "Game added to history successfully."
        });
       } catch (err) { // Catch any errors that occur during execution
        // Respond with a 400 status and a failure message, including the error details
        res.status(400).json({
            status: "Failed",
            message: `Error: ${err}`
        });
    }
};

const removeGameFromHistory = async (req, res) => {
    try {
        const userId = req.body.user_id;
        const game = req.body.game;

        const user = await User.findOne({ where: { user_id: userId } });

        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found."
            });
        }

        let gameHistory = JSON.parse(user.game_history);

        if (gameHistory.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "No games are in your game history."
            });
        }

        const gameIndex = gameHistory.indexOf(game);

        if (gameIndex === -1) {
            return res.status(404).json({
                status: "Failed",
                message: "Game not found in history."
            });
        }

        gameHistory.splice(gameIndex, 1);
        await user.update({ game_history: JSON.stringify(gameHistory) });

        res.status(200).json({
            status: "Success",
            message: "Game removed from history successfully."
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: `Error: ${err}`
        });
    }
};

const clearGameHistory = async (req, res) => {
    try {
        const userId = req.body.user_id;

        const user = await User.findOne({ where: { user_id: userId } });

        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found."
            });
        }

        await user.update({ game_history: "[]" });

        res.status(200).json({
            status: "Success",
            message: "Game history cleared successfully."
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: `Error: ${err}`
        });
    }
};

const retrieveGameHistory = async (req, res) => {
    try {
        const userId = req.query.user_id;

        const user = await User.findOne({ where: { user_id: userId } });

        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found."
            });
        }

        const gameHistory = JSON.parse(user.game_history);

        res.status(200).json({
            status: "Success",
            data: gameHistory
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: `Error: ${err}`
        });
    }
};

  

module.exports = { createUser, 
                  get_all_users, 
                  get_user, 
                  addGameToHistory, 
                  removeGameFromHistory,
                  clearGameHistory,
                  retrieveGameHistory };
