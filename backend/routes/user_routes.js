const express = require("express");
const user_router = express.Router();
const { createUser, get_all_users } = require("../controllers/user_controller");

user_router.post("/create", createUser);

user_router.get("/all", get_all_users);

module.exports = user_router;
