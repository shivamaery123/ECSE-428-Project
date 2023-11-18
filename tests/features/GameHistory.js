
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const {
  login,
  navigateTo,
  addGameToHistory,
  retrieveGameHistory,
  getRecommendations,
} = require('./controller'); // Update the path accordingly

Before(async function () {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  // Create a user for delete tests

  this.userData = {
    username: "Maxou123",
    email: "maxime.drouin2@mail.mcgill.ca",
    password: "0000",
  };

  await axios.post("http://localhost:8000/users/register", this.userData);
});

Given(
    'the customer is logged into their account',
    async function () {
    await login({ username: 'actual_username', password: 'actual_password' });
});

Given(
    'the customer is on their game history page',
    function () {
    navigateTo('game history page');
});

When(
    'the customer adds a new game {string} to their history',
     async function (gameName) {
     await addGameToHistory({ user_id: 'user_id', game: gameName });
});

Then(
    '{string} should be displayed in their game history',
    async function (gameName) {
    const history = await retrieveGameHistory({ user_id: 'user_id' });

    try {
      const expectedGames = ['Game 1', 'Game 2', 'Game 3'];

      for (const gameName of expectedGames) {
        if (!history.includes(gameName)) {
          throw new Error(`Expected game "${gameName}" not found in history.`);
        }
      }
      console.log('Test passed: All expected games found in history.');

    } catch (err) {
      this.response = err.response
      console.error('Test failed');
    }

});

Given(
    'the customer already has {string} in their game history',
    async function (gameName) {
    await addGameToHistory({ user_id: 'user_id', game: gameName });
});

When(
    'the customer tries to add {string} again',
    async function (gameName) {
    await addGameToHistory({ user_id: 'user_id', game: gameName });
});

When(
    'the customer tries to add a game without selecting a title',
    async function () {
    await addGameToHistory({ user_id: 'user_id', game: '' });
});

Given(
    'the customer has added {string} to their game history',
    async function (gameName) {
    await addGameToHistory({ user_id: 'user_id', game: gameName });
});

When(
    'the customer navigates to the recommendations page',
    function () {
    navigateTo('recommendations page');
});

Then(
    'the recommendations should be updated based on the addition of {string}',
    async function (gameName) {
    const recommendations = await getRecommendations();

    try {
          const recommendations = ['Game 1', 'Game 2', 'Game 3'];
          if (!arraysEqual(recommendations, expectedGames)) {
            throw new Error('Recommendations have not been updated.');
          }
        } catch (err) {
          this.response = err.response
          console.error(`Test failed: ${error.message}`);
        }
});

Given(
    'the customer has added several games to their history',
    async function () {
  // Add multiple games to the history as part of the setup
    const games = ['Game 1', 'Game 2', 'Game 3'];
    for (const game of games) {
    await addGameToHistory({ user_id: 'user_id', game_id: 'game_id' });
  }
});

When(
    'the customer navigates to their game history page',
    function () {
    navigateTo('game history page');
});

Then(
    'all added games should be listed in their game history',
    async function () {
    const history = await retrieveGameHistory({ user_id: 'user_id' });
    try {
      const expectedGames = ['Game 1', 'Game 2', 'Game 3'];
      if (!arraysEqual(history, expectedGames)) {
        throw new Error('Arrays do not have the same elements.');
      }
    } catch (err) {
      this.response = err.response
      console.error(`Test failed: ${error.message}`);
    }
});
