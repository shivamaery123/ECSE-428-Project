/**
 * This file is used to setup the step definitions of ModifyUser.feature
 */

const { Given, When, Then, Before } = require("@cucumber/cucumber");
const axios = require("axios");
const assert = require("assert");
const User = require("../../backend/models/User");
const { url } = require("inspector");


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

/////////////////////////
// GIVEN
/////////////////////////
Given(
    "a user exists in the database with email {string}, username {string}, password {string}",
    async function (email, username, password) {
        await User.destroy({
          truncate: true,
          cascade: true,
          restartIdentity: true,
        });

        this.userData = {
            username: username,
            email: email,
            password: password
        };
        await axios.post("http://localhost:8000/users/register", this.userData);

        const response = await axios.get("http://localhost:8000/users/all");
        const users = response.data.data.users;
        assert.strictEqual(1, users.length);
    }
)


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
  
Given(
    "I have a valid username and email but no password for a new user",
    function () {
        this.userData = {
        username: "shivam123",
        email: "shivam.aery@mail.mcgill.ca",
        };
    }
);

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
Given("a user exists in the database", async function () {
    const response = await axios.get("http://localhost:8000/users/all");
    const users = response.data.data.users;
    assert.strictEqual(1, users.length);
  });


/////////////////////////
// WHEN
/////////////////////////

When (
    "I make a PUT request with the user information to {string} with original email {string} and new email {string}, username {string} and password {string}",
    async function (url, email, newEmail, newUsername, newPassword) {
        this.data = {
            email: email,
            newEmail: newEmail,
            newUsername: newUsername,
            newPassword: newPassword
        }
        try {
            const response = await axios.put(url, this.data);
            this.response = response
        } catch (err) {
            this.response = err.response
            console.log("Put request to modify user failed");
        }
    }
)

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

/////////////////////////
// THEN
/////////////////////////

Then(
    "the response status code should be {int}",
    function (expected_status_code) {
      assert.strictEqual(this.response.status, expected_status_code);
    }
  );
  
Then(
"the response should contain a status message {string}",
function (status_indicator) {
    assert.strictEqual(this.response.data.status, status_indicator);
}
);
  
Then(
"the response should contain a message {string}",
function (status_message) {
    assert.strictEqual(this.response.data.message, status_message);
}
);

Then (
    "the response should contain the user with email {string}, username {string} and password {string}",
    function (email, username, password) {
        const user = this.response.data.data.user;
    
        assert.strictEqual(user.email, email);
        assert.strictEqual(user.username, username);
        assert.strictEqual(user.password, password);
      }
)

Then(
    "there shall be a user in the system with email {string}, username {string} and password {string}",
    async function (email, username, password) {
        const response = await axios.get(`http://localhost:8000/users/user?email=${email}`)
        const user = response.data.data.user
        assert.equal(user.email,email)
        assert.equal(user.username,username)
        assert.equal(user.password,password)
    }
)

Then(
    "the response should contain the user with the username, password and email specified in the request",
    function () {
        const user = this.response.data.data.user;

        assert.strictEqual(this.userData.email, user.email);
        assert.strictEqual(this.userData.username, user.username);
        assert.strictEqual(this.userData.password, user.password);
    }
);

