/**
 * This file is used to setup the step definitions of RemoveGameFromHistory.feature
 */

const { Given, When, Then, Before } = require("@cucumber/cucumber");
const axios = require("axios");
const assert = require("assert");
const User = require("../../backend/models/User");

// Before every scenario, empty all records of user table and reset auto increment id

Before(async function () {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

// Background
Given("a game exists in the database with game name {string}, game creator {string} and game type {string}", 
async function (game_name, game_creator, game_type) {
    this.gameData = {
        game_name: game_name,
        game_creator : game_creator, 
        game_type : game_type
    }
    // create the game
    await axios.post("http://localhost:8000/games/create", this.gameData);
  });

// Remove existing game from game history (Normal Flow)
Given("the user with username {string} has a game history that contains valid game {string}", 
async function (username, game_name) {

    this.userGameData = {
        username: username,
        game_name: game_name
    };
    // add game to game history
    await axios.post("http://localhost:8000/users/game/add", this.userGameData);

  });

When(
    "I make a DELETE request for the valid user {string} with the game {string} to {string}",
    async function (username, game_name, url_without_query_params) {
      const url = `${url_without_query_params}?username=${username}&game_name=${game_name}`;
      try {
        const response = await axios.delete(url);
        this.response = response;
      } catch (err) {
        this.response = err.response;
      }
    }
  );

// Removing game that is not in game history (Error Flow)

When(
    "I make a DELETE request for the valid user {string} with the invalid game {string} to {string}",
    async function (username, game_name, url_without_query_params) {
        const url = `${url_without_query_params}?username=${username}&game_name=${game_name}`;
      try {
        const response = await axios.delete(url);
        this.response = response;
      } catch (err) {
        this.response = err.response;
      }
    }
  );


Then('the response status code for game removal be {int}', 
  function (expected_status_code) {
    assert.strictEqual(this.response.status, expected_status_code);
  }
);

Then(
  "the response for game removal should contain a status message {string}",
  function (status_indicator) {
    assert.strictEqual(this.response.data.status, status_indicator);
  }
);

Then(
  "the response for game removal should contain a message {string}",
  function (status_message) {
    assert.strictEqual(this.response.data.message, status_message);
  }
);


