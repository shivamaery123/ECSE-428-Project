Feature: Create Game

As a user, I want to be able to add games to the system so that I can add games to my history.

Scenario: Create game (Normal Flow)
    Given a game does not exist in the database
    When I make a POST request to create the game with game name "Sample Game", game creator "Luke Bebee", game type "Sample Game" at "http://localhost:8000/games/create"
    Then the response status code for creating the game should be 201
    And the response for creating the game should contain a status message "Success"
    And the response message for creating the game should contain "Game created successfully"

