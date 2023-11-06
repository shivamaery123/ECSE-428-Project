/**
 * This file is used to setup the controller for the User model allowing CRUD interactions with the database
 */

const User = require("../models/User");

// Register a user for their account

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).json({
      status: "Success",
      message: "User registered successfully",
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
    } else if("username" in query) {
      user = await User.findOne({
        where: {
          username: query.username
        }
      })
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
const modify_user = async(req,res) => {
  try {
    const { email, newEmail, newUsername, newPassword } = req.body;

    //retrieve user by email
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user == null) {
      res.status(404).json({
        status: "Failed",
        message: `User does not exist.`,
      });
    } else {
      if(newEmail!=null && newEmail!="") {
        await user.update({email: newEmail})
      }
      if(newUsername!=null && newUsername!="") {
        await user.update({username: newUsername})
      }
      if(newPassword!=null && newPassword!="") {
        await user.update({password: newPassword})
      }
      res.status(200).json({
        status: "Success",
        message: "User modified successfully",
        data: {
          user: user,
        },
      });

    }

  } catch(err) {
    res.status(400).json({
      status: "Failed",
      message: `Failed to modify user, ${err}`
    });
  }
}


const login = async(req, res) => {
  try {
    const  { username, password} = req.body;
    var user = await User.findOne({
      where: {
        username: username,
        password: password
      }
    });

    if(user == null) {
      res.status(404).json({
        status: "Failed",
        message: `Could not find user with username/password`
      });
    }
    else {
      res.status(201).json({
        status: "Success",
        message: "User logged in successfully.",
        data: {
          username: user.username
        },
      });
    }
  }
  catch (err) {
    res.status(400).json({
      status: "Failed",
      message: `User was not successfuly logged in, ${err}`,
    });
  }
}

module.exports = { registerUser, get_all_users, get_user, deleteUser, modify_user, login};
