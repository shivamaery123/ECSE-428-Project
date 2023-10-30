const express = require("express");
const user_router = express.Router();
const { createUser, 
       get_all_users, 
       get_user,
      addGameToHistory,
      removeGameFromHistory,
      retreiveGameHistory} = require("../controllers/user_controller");

user_router.post("/create", createUser);

user_router.get("/all", get_all_users);

user_router.get("/user", get_user)
// /user?id={id}
// /user?email={email}

user_router.post("/game/add", addGameToHistory);         
user_router.delete("/game/remove", removeGameFromHistory); 
user_router.delete("/game/clear", ClearGameHistory);      
user_router.get("/game/history", retrieveGameHistory);   

module.exports = user_router;
