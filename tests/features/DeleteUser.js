/**
 * This file is used to setup the step definitions of DeleteUser.feature
 */

const { Given, When, Then, Before } = require("@cucumber/cucumber");
const axios = require("axios");
const assert = require("assert");
const User = require("../../backend/models/User");

// Background

Given("a user exists in the database", async function () {
  const response = await axios.get("http://localhost:8000/users/all");
  const users = response.data.data.users;
  assert.strictEqual(1, users.length);
});

// Before every scenario, empty all records of user table and reset auto increment id

Before(async function () {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  // Create a user for delete tests

  this.userData = {
    username: "shivam123",
    email: "shivam.aery@mail.mcgill.ca",
    password: "0000",
  };

  await axios.post("http://localhost:8000/users/register", this.userData);
});

// Delete a user with email and username provided

When(
  "I make a DELETE request with the user information to {string} with a valid username {string} and valid email {string}",
  async function (url_without_query_params, username, email) {
    const url = `${url_without_query_params}?email=${email}&username=${username}`;
    try {
      const response = await axios.delete(url);
      this.response = response;
    } catch (err) {
      this.response = err.response;
    }
  }
);

Then(
  "the response status code for deletion should be {int}",
  function (expected_status_code) {
    assert.strictEqual(this.response.status, expected_status_code);
  }
);

Then(
  "the response for deletion should contain a status message {string}",
  function (status_indicator) {
    assert.strictEqual(this.response.data.status, status_indicator);
  }
);

Then(
  "the response for deletion should contain a message {string}",
  function (status_message) {
    assert.strictEqual(this.response.data.message, status_message);
  }
);

// Delete a user with no email, only username provided

When(
  "I make a DELETE request with the user information to {string} with a valid username {string} and no email",
  async function (url_without_query_params, username) {
    const url = `${url_without_query_params}?username=${username}`;
    try {
      const response = await axios.delete(url);
      this.response = response;
    } catch (err) {
      this.response = err.response;
    }
  }
);

// Delete a user with a non-existent username (Error Flow)

When(
  "I make a DELETE request with the user information to {string} with a non existent username {string}",
  async function (url_without_query_params, username) {
    const url = `${url_without_query_params}?username=${username}`;
    try {
      const response = await axios.delete(url);
      this.response = response;
    } catch (err) {
      this.response = err.response;
    }
  }
);
