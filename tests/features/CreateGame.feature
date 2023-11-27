Feature: Create Game

As a user, I want to be able to add games to the system so that I can add games to my history.

Scenario: Create game (Normal Flow)
    Given a game with game name "Sample RPG Game", game creator "Luke Bebee", game type "RPG" does not exist in the database
    When I make a POST request to create the game at "http://localhost:8000/games/create"
    Then the response status code for creating the game should be 201
    And the response message should have status "Success"
    And the response message should contain a status message containing "Game created successfully"

Scenario: Create game (Error Flow)
    Given a game with game name "Sample Board Game", game creator "Luke Bebee", game type "Board Game" does not exist in the database
    When I make a POST request to create the game at "http://localhost:8000/games/create"
    Then the response status code for creating the game should be 400
    And the response message should have status "Failed"
    And the response message should contain a status message containing "Game was not created"
