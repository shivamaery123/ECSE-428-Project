/**
 * This file is used to setup the step definitions of ModifyUser.feature
 */

const { Given, When, Then, Before } = require("@cucumber/cucumber");
const axios = require("axios");
const assert = require("assert");
const User = require("../../backend/models/User");

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

/////////////////////////
// WHEN
/////////////////////////

When (
    "I make a PUT request with the user information to {string} with original email {string} and new email {string}, username {string} and password {string} and original password {string}",
    async function (url, email, newEmail, newUsername, newPassword, password) {
        this.data = {
            email: email,
            newEmail: newEmail,
            newUsername: newUsername,
            newPassword: newPassword,
            password: password
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


/////////////////////////
// THEN
/////////////////////////
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

Then (
    "the response should contain the user with email {string}, username {string} and password {string}",
    function (email, username, password) {
        const user = this.response.data.data.user;
    
        assert.strictEqual(user.email, email);
        assert.strictEqual(user.username, username);
        assert.strictEqual(user.password, password);
      }
)
