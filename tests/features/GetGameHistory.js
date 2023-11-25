/**
 * This file is used to setup the step definitions of GetGameHistory.feature
 */

const { Given, When, Then, Before } = require("@cucumber/cucumber");
const axios = require("axios");
const assert = require("assert");
const User = require("../../backend/models/User");
const Game = require("../../backend/models/Game");



/////////////////////////
// GIVEN
/////////////////////////
Given(
    "the following games exist",
    async function(table) {
        await Game.destroy({
          truncate: true,
          cascade: true,
          restartIdentity: true,
        });
        const rows = table.hashes()
        for(const row of rows) {
            let game_name = row["game_name"];
            let game_creator = row["game_creator"]
            let game_type = row["game_type"]
            
            let game_data = {
                game_name: game_name,
                game_creator: game_creator,
                game_type: game_type
            }
            await axios.post("http://localhost:8000/games/create",game_data);

        }
        const response = await axios.get("http://localhost:8000/games/all");
        const games = response.data.data.games;
        assert.strictEqual(rows.length,games.length)
    }
)

Given (
    "user with username {string} has the following games in their game history",
    async function(username,table) {
        //let response = await axios.get(`http://localhost:8000/users/user?username=${username}`);
        await axios.delete(`http://localhost:8000/users/game/clear?username=${username}`);
        
        const rows = table.hashes();
        for(const row of rows) {
            let game_name = row["game_name"];
            
            let game_data = {
                username : username,
                game_name: game_name
            }
            await axios.post(`http://localhost:8000/users/game/add`,game_data);
        }
        const response = await axios.get(`http://localhost:8000/users/game/history?username=${username}`);
        const games = response.data.data;
        assert.strictEqual(rows.length,games.length)
    }
)


/////////////////////////
// WHEN
/////////////////////////




/////////////////////////
// THEN
/////////////////////////

Then(
    "the response should display the following games in my game history",
    function (table) {
        const rows = table.hashes();
        actual_game_history = rows.map(game => game.game_name);
        response_game_history = this.response.data.data.map( game => game.game_name)

        
        assert.strictEqual(actual_game_history.every(game_name => {
            return response_game_history.includes(game_name)
        }), true)
        
    }
)