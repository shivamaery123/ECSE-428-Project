/**
 * This file is used to setup the step definitions of GetAllUsers.feature
 */

const { Given, When, Then, Before } = require("@cucumber/cucumber");
const axios = require("axios");
const assert = require("assert");
const User = require("../../backend/models/User");

/////////////////////////
// GIVEN
/////////////////////////

Given(
    "no users are registered in the system",
    async function() {
        try {
            await User.destroy({
              truncate: true,
              cascade: true,
              restartIdentity: true,
            });
        } 
        catch(err) {
            this.response = err.response
            console.log("Delete all users failed")
        }
    }
)

/////////////////////////
// WHEN
/////////////////////////

When(
    "I make a GET request to {string}",
    async function (url) {
        try {
            const response = await axios.get(`${url}`, this.data);
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
    "the response should contain {int} users",
    function (numUsers) {
        assert.strictEqual(numUsers, this.response.data.data.users.length);
    }
)