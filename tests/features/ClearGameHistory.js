const { Given, When, Then, Before } = require("@cucumber/cucumber");
const axios = require("axios");
const assert = require("assert");
const User = require("../../backend/models/User");

// Background

Before(async function () {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

Given('I am logged in as a regular user with username "username1" and email "user@email.com"', async function () {

    this.userData = {
        username: "username1",
        email: "user@email.com",
        password: "0000",
        game_history: "[]"
      };
      await axios.post("http://localhost:8000/users/register", this.userData);
});


Given('My game history contains "Elden Ring" and "Cyberpunk 2077"', async function () {
    this.userData = {
        username: "username1",
        email: "user@email.com",
        password: "0000",
        game_history: "[Elden Ring Cyberpunk 2077]"
      };
      await axios.post("http://localhost:8000/users/register", this.userData);
});

// Clear Game History using a valid email

When('I make a DELETE request to {string} with email {string}', async function (url, email) {
  try {
    const response = await axios.delete(`${url}?email=${email}`);
    this.response = response;
  } catch (err) {
    this.response = err.response;
  }
});

Given('My game history does not contain any games', async function () {
    this.userData = {
        username: "username1",
        email: "user@email.com",
        password: "0000",
        game_history: "[]"
      };
      await axios.post("http://localhost:8000/users/register", this.userData);
});