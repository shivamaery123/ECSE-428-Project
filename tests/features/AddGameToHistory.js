const { Given, When, Then, Before } = require("@cucumber/cucumber");
const axios = require("axios");
const assert = require("assert");
const User = require("../../backend/models/User");

Before(async function () {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

Given("a game exists in the database with game name {string}, game creator {string} and game type {string}",
async function (game_name, game_creator, game_type) {
    this.gameData = {
        game_name: game_name,
        game_creator : game_creator,
        game_type : game_type
    };

    await axios.post("http://localhost:8000/games/create", this.gameData);
});

Given("the user with username {string} has a game history that does not contain game {string}",
async function (username, game_name) {
    this.userGameData = {
        username: username,
        game_name: game_name
    };

});

When("I make a POST request to {string} with username {string} and game name {string}",
async function (url, username, game_name) {
    try {
        const response = await axios.post(url, { username: username, game_name: game_name });
        this.response = response;
    } catch (err) {
        this.response = err.response;
    }
});

Then('the response status code should be {int}', function (expected_status_code) {
    assert.strictEqual(this.response.status, expected_status_code);
});

Then("the response should contain a status message {string}", function (status_indicator) {
    assert.strictEqual(this.response.data.status, status_indicator);
});

Then("the response should contain a message {string}", function (status_message) {
    assert.strictEqual(this.response.data.message, status_message);
});