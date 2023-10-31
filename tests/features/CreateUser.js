const { Given, When, Then } = require("@cucumber/cucumber");
const axios = require("axios");
const assert = require("assert");

// Register a user (Normal Flow)

Given(
  "I have a valid username, password and email for a new user",
  function () {
    this.userData = {
      username: "shivam123",
      email: "shivam.aery@mail.mcgill.ca",
      password: "0000",
    };
  }
);

When(
  "I make a POST request with the user information to {string}",
  async function (url) {
    try {
      this.response = await axios.post(url, this.userData);
    } catch (err) {
      console.log("Post request to register user failed");
    }
  }
);

Then(
  "the response status code should be {int}",
  function (expected_status_code) {
    assert.equal(this.response.status, expected_status_code);
  }
);

Then(
  "the response should contain a status message {string}",
  function (status_indicator) {
    assert.equal(this.response.data.status, status_indicator);
  }
);

Then(
  "the response should contain a message {string}",
  function (status_message) {
    assert.equal(this.response.data.message, status_message);
  }
);

Then(
  "the response should contain the user with the username, password and email specified in the request",
  function () {
    const user = this.response.data.data.user;

    assert.equal(this.userData.email, user.email);
    assert.equal(this.userData.username, user.username);
    assert.equal(this.userData.password, user.password);
  }
);

// No password provided (Error Flow)

Given(
  "I have a valid username and email but no password for a new user",
  function () {
    this.userData = {
      username: "shivam123",
      email: "shivam.aery@mail.mcgill.ca",
    };
  }
);

When(
  "I make a POST request with the invalid user information to {string}",
  async function (url) {
    try {
      this.response = await axios.post(url, this.userData);
    } catch (err) {
      console.log("Post request to register user failed");

      this.response = err.response;
    }
  }
);

// Register a user wiith empty password (Alternate Flow)

Given(
  "I have a valid username and email and a password equal to empty string for a new user",
  function () {
    this.userData = {
      username: "shivam123",
      email: "shivam.aery@mail.mcgill.ca",
      password: "",
    };
  }
);
