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
  "a game with game name {string}, game creator {string}, game type {string} does not exist in the database",
  async function (game_name, game_creator, game_type) {
    // already emptied in the before
    this.gameData = {
        game_name: game_name,
        game_creator: game_creator,
        game_type: game_type,
      };
  }
);

When(
    "I make a POST request to create the game at {string}",
    async function (url) {
      
      try {
        
        this.response = await axios.post(url, this.gameData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        
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
  "the response message should have status {string}",
  function (statusMessage) {
    assert.strictEqual(this.response.data.status, statusMessage);
  }
);

Then(
  "the response message should contain a status message containing {string}",
  function (responseMessage) {
    assert(this.response.data.message.includes(responseMessage));
  }
);

