/**
 * This file is used to setup the routes of the application
 */

const express = require("express");

// Create user router

const user_router = express.Router();
const {
  registerUser,
  get_all_users,
  get_user,
  deleteUser,
  modify_user,
  login,
  addGameToHistory,
  removeGameFromHistory,
  clearGameHistory,
  retrieveGameHistory
} = require("../controllers/user_controller");

// Create a user route

user_router.post("/register", registerUser);

// Get all users route

user_router.get("/all", get_all_users);

// Get a user route

user_router.get("/user", get_user);

// Delete a user route

user_router.delete("/user", deleteUser);

// Modify a user route

user_router.put("/user",modify_user)

// Login the user

user_router.post('/login', login)

//add a game to game history route
user_router.post("/game/add", addGameToHistory);     

//remove a game from game history route
user_router.delete("/game/remove", removeGameFromHistory); 

//clear game history route
user_router.delete("/game/clear", clearGameHistory);      

//retrieve game history route
user_router.get("/game/history", retrieveGameHistory);   

module.exports = user_router;
