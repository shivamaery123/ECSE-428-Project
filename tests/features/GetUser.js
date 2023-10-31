const { Given, When, Then } = require("@cucumber/cucumber");
const axios = require("axios");
const assert = require("assert");
const User = require("../../backend/models/User");

// Background

Given('I am logged in as a regular user with username "username123" and email "user@email.com"', async function () {
    this.userData = {
        username: "username123",
        email: "user@email.com",
        password: "0000",
      };
      await axios.post("http://localhost:8000/users/register", this.userData);
});

// Retrieve user details using a valid email

When('I make a GET request to {string} with my valid email {string}', async function (url, email) {
  try {
    const response = await axios.get(`${url}?email=${email}`);
    this.response = response;
  } catch (err) {
    this.response = err.response;
  }
});

// Retrieve user details using a valid username

When('I make a GET request to {string} with my valid username {string}', async function (url, username) {
  try {
    const response = await axios.get(`${url}?username=${username}`);
    this.response = response;
  } catch (err) {
    this.response = err.response;
  }
});

// Attempt to retrieve user details using another user's email or username

When('I make a GET request to {string} with another user\'s email {string}', async function (url, email) {
  try {
    const response = await axios.get(`${url}?email=${email}`);
    this.response = response;
  } catch (err) {
    this.response = err.response;
  }
});

When('I make a GET request to {string} with another user\'s username {string}', async function (url, username) {
  try {
    const response = await axios.get(`${url}?username=${username}`);
    this.response = response;
  } catch (err) {
    this.response = err.response;
  }
});

// Validate Response

Then('the response status code should be {int}', function (expectedStatus) {
  assert.strictEqual(this.response.status, expectedStatus);
});

Then('the response should contain a status message {string}', function (expectedStatusMessage) {
  assert.strictEqual(this.response.data.status, expectedStatusMessage);
});

Then('the response should contain my user details for the email {string}', function (email) {
  assert.strictEqual(this.response.data.email, email);
});

Then('the response should contain my user details for the username {string}', function (username) {
  assert.strictEqual(this.response.data.username, username);
});

// Additional steps for other scenarios can be added similarly.
