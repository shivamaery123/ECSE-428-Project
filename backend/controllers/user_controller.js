/**
 * This file is used to setup the controller for the User model allowing CRUD interactions with the database
 */

const User = require("../models/User");
const Game = require("../models/Game");

// Register a user for their account

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user_in_db_with_username = await User.findOne({
      where: { username: username },
    });
    const user_in_db_with_email = await User.findOne({
      where: { email: email },
    });
    if (user_in_db_with_email !== null || user_in_db_with_username !== null) {
      return res.status(400).json({
        status: "Failed",
        message: "Email or username already exists",
      });
    }
    if (email === "" || password === "" || username === "") {
      return res.status(400).json({
        status: "Failed",
        message: "Email, password and username cannot be empty",
      });
    }
    const user = await User.create({ username, email, password });
    return res.status(201).json({
      status: "Success",
      message: "User registered successfully",
      data: {
        user: user,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "Failed",
      message: `User was not created, error: ${err}`,
    });
  }
};

// Delete a user via their id email or username

const deleteUser = async (req, res) => {
  try {
    const { username, email, id } = req.query;
    let user;
    if (id) {
      user = await User.findByPk(id);
    } else if (email) {
      user = await User.findOne({ where: { email: email } });
    } else if (username) {
      user = await User.findOne({ where: { username: username } });
    }
    if (!user) {
      return res
        .status(404)
        .json({ status: "Fail", message: "User not found" });
    }

    await user.destroy();

    res.status(200).json({
      status: "Success",
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: `User was not deleted, error: ${err}`,
    });
  }
};

// Get all users stored

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

// Get a user via id or email
const get_user = async (req, res) => {
  try {
    const query = req.query;
    var user = null;

    if ("email" in query) {
      user = await User.findOne({
        where: {
          email: query.email,
        },
      });
    } else if ("id" in query) {
      user = await User.findOne({
        where: {
          user_id: query.id,
        },
      });
    } else if ("username" in query) {
      user = await User.findOne({
        where: {
          username: query.username,
        },
      });
    } else throw new Error("Invalid query");

    if (user == null) {
      res.status(404).json({
        status: "Failed",
        message: `User does not exist.`,
      });
    } else {
      res.status(200).json({
        status: "Success",
        message: "User retrieved successfully.",
        data: {
          user: user,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: `User was not successfuly fetched, ${err}`,
    });
  }
};

// Modify a user by email
const modify_user = async (req, res) => {
  try {
    const { email, newEmail, newUsername, newPassword, password } = req.body;
    const user_with_new_email = await User.findOne({
      where: {
        email: newEmail,
      },
    });
    if (user_with_new_email !== null) {
      return res.status(400).json({
        status: "Failed",
        message: "Enter a new email that does not already correspond to a user",
      });
    }
    //retrieve user by email
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    // We need to make the user confirm their current password
    if (user == null) {
      return res.status(404).json({
        status: "Failed",
        message: `User does not exist.`,
      });
    } else if (user.password !== password) {
      return res.status(400).json({
        status: "Failed",
        message: "Entered password does not match current password of user",
      });
    } else {
      if (newEmail != null && newEmail != "") {
        await user.update({ email: newEmail });
      }
      if (newUsername != null && newUsername != "") {
        await user.update({ username: newUsername });
      }
      if (newPassword != null && newPassword != "") {
        await user.update({ password: newPassword });
      }
      return res.status(200).json({
        status: "Success",
        message: "User modified successfully",
        data: {
          user: user,
        },
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: "Failed",
      message: `Failed to modify user, ${err}`,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    var user = await User.findOne({
      where: {
        username: username,
        password: password,
      },
    });

    if (user == null) {
      res.status(404).json({
        status: "Failed",
        message: `Could not find user with username/password`,
      });
    } else {
      res.status(201).json({
        status: "Success",
        message: "User logged in successfully.",
        data: {
          username: user.username,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: `User was not successfuly logged in, ${err}`,
    });
  }
};
const addGameToHistory = async (req, res) => {
  try {
    //getting userID and game from the request
    const {user_id, username} = req.body;
    const game_name = req.body.game_name; 

    let user;
    if (user_id) {
      user = await User.findByPk(user_id);
    } else if (username) {
      user = await User.findOne({ where: { username: username } });
    } else throw new Error("Invalid query");

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found.",
      });
    }
    const game = await Game.findOne({ where: { game_name: game_name } });
    if (!game) {
      return res.status(404).json({
        status: "Failed",
        message: "Game not found.",
      });
    }
    let gameHistory = user.game_history;
    gameHistory.push(game);

    await user.update({ game_history: gameHistory });

    res.status(200).json({
      status: "Success",
      message: "Game added to history successfully.",
    });
  } catch (err) {
    // Catch any errors that occur during execution
    // Respond with a 400 status and a failure message, including the error details
    res.status(400).json({
      status: "Failed",
      message: `Error: ${err}`,
    });
  }
};

const removeGameFromHistory = async (req, res) => {
  try {
      const { user_id, username} = req.query;

      //getting userID and game from the request
      //const user_id= req.body.user_id;
      const game_name = req.query.game_name; //NOTE: MIGHT NEED TO BE CHANGED BASED ON THE GAME MODEL
  
      //Fetching the respective user from the database
      //const user= await User.findOne({ where: { user_id: user_id } });
      let user;
      if (user_id) {
        user = await User.findByPk(user_id);
      } else if (username) {
        user = await User.findOne({ where: { username: username } });
      } else throw new Error("Invalid query");

      if (!user) {
          return res.status(404).json({
              status: "Failed",
              message: "User not found."
          });
      }

      let gameHistory = user.game_history;

      if (gameHistory.length === 0) {
          return res.status(404).json({
              status: "Failed",
              message: "No games are in your game history."
          });
      }

      const gameIndex = gameHistory.findIndex(i => i.game_name === game_name);

      if (gameIndex === -1) {
          return res.status(404).json({
              status: "Failed",
              message: "Game not found in history."
          });
      }

      gameHistory.splice(gameIndex, 1);
      await user.update({ game_history: gameHistory });

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
      const { user_id, username} = req.query;

      //Fetching the respective user from the database
      //const user= await User.findOne({ where: { user_id: user_id } });
      var user;
      if (user_id) {
        user = await User.findOne({ where: { user_id: user_id } });
      } else if (username) {
        user = await User.findOne({ where: { username: username } });
      } else throw new Error("Invalid query");

      if (user == null) {
          return res.status(404).json({
              status: "Failed",
              message: "User not found."
          });
      }
      let gameHistory = user.game_history;
      if (gameHistory.length === 0) {
        return res.status(200).json({
            status: "Success",
            message: "No games in your history to clear."
        });
      }

       await user.update({ game_history: [] });

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
    const { user_id, username} = req.query;

    var user;
    if(user_id) {
      user = await User.findOne({ where: { user_id: user_id } });
    } else if(username) {
      user = await User.findOne({ where: { username: username}});
    } else throw new Error("Invalid query");
    

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found.",
      });
    }

    const gameHistory = user.game_history;

    res.status(200).json({
      status: "Success",
      data: gameHistory,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: `Error: ${err}`,
    });
  }
};

module.exports = {
  registerUser,
  get_all_users,
  get_user,
  deleteUser,
  modify_user,
  login,
  addGameToHistory,
  removeGameFromHistory,
  clearGameHistory,
  retrieveGameHistory,
};
