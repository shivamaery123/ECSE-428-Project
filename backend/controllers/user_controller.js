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

module.exports = { createUser, get_all_users };