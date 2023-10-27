const express = require("express");
const user_router = express.Router();
const { createUser, get_all_users, get_user } = require("../controllers/user_controller");

user_router.post("/create", createUser);

user_router.get("/all", get_all_users);

user_router.get("/user", get_user)

module.exports = user_router;
