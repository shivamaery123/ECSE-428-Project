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
  "a game exists in the database with game name {string}, game creator {string}, game type {string}",
  async function (game_name, game_creator, game_type) {
    const url = "http://localhost:8000/games/create";
    this.gameData = {
      game_name: game_name,
      game_creator: game_creator,
      game_type: game_type,
    };
    try {
      this.response = await axios.post(url, this.gameData);
    } catch (err) {
      console.log("Post request to create game failed: ", err);
    }
  }
);

When(
  "I make a GET request to fetch all games at {string}",
  async function (url) {
    try {
      this.response = await axios.get(url);
    } catch (err) {
      console.log("Could not connect to server: ", err);
    }
  }
);

Then(
  "the response status code for fetching all games should be {int}",
  function (statusCode) {
    assert.equal(this.response.status, statusCode);
  }
);

Then(
  "the response for fetching all games should contain a status message {string}",
  function (statusMessage) {
    assert.strictEqual(this.response.data.status, statusMessage);
  }
);

Then(
  "the response message for fetching all games should be {string}",
  function (responseMessage) {
    assert.strictEqual(this.response.data.message, responseMessage);
  }
);

Then("the response should contain {int} games", function (numberOfGames) {
  assert.strictEqual(this.response.data.data.games.length, numberOfGames);
});
