Feature: Get All Games

As an user, I want to be able to retrieve all games from my game history so that I can track all games that I have played

Scenario: Retrieve all games (Normal Flow)
    Given a game exists in the database with game name "Shivam Aery's Game", game creator "Shivam Aery", game type "RPG"
    When I make a GET request to fetch all games at "http://localhost:8000/games/all"
    Then the response status code for fetching all games should be 200
    And the response for fetching all games should contain a status message "Success"
    And the response message for fetching all games should be "Games retrieved successfully"
    And the response should contain 1 games

Scenario: Attempt to retrieve games when there are none in the database (Alternate Flow)
    When I make a GET request to fetch all games at "http://localhost:8000/games/all"
    Then the response status code for fetching all games should be 200
    And the response for fetching all games should contain a status message "Success"
    And the response message for fetching all games should be "Games retrieved successfully"
    And the response should contain 0 games

