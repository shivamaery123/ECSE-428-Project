const express = require("express");
const user_router = express.Router();
const {
  registerUser,
  get_all_users,
  get_user,
} = require("../controllers/user_controller");

user_router.post("/register", registerUser);

user_router.get("/all", get_all_users);

user_router.get("/user", get_user);
// /user?id={id}
// /user?email={email}

module.exports = user_router;
