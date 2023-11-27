const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const axios = require("axios");
const assert = require("assert");
const Game = require("../../backend/models/Game");

Before(async function () {
  await Game.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

After(async function () {
  await Game.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

// Normal Flow and Alternate Flow

Given(
  "a game does not exist in the database",
  async function () {
    // already emptied in the before
  }
);

When(
    "I make a POST request to create the game with game name {string}, game creator {string}, game type {string} at {string}",
    function (game_name, game_creator, game_type, url) {
      this.gameData = {
        game_name: game_name,
        game_creator: game_creator,
        game_type: game_type,
      };
      try {
        this.response =  axios.post(url, this.gameData);
      } catch (err) {
        console.log("Post request to create game failed: ", err);
      }
    }
  );

Then(
  "the response status code for creating the game should be {int}",
  function (statusCode) {
      console.log(this.response.status);
    assert.equal(this.response.status, statusCode);
  }
);

Then(
  "the response for creating the game should contain a status message {string}",
  function (statusMessage) {
    assert.strictEqual(this.response.data.status, statusMessage);
  }
);

Then(
  "the response message for creating the game should contain {string}",
  function (responseMessage) {
    assert(this.response.data.message.includes(responseMessage));
  }
);

