Feature: Add game to game history

  As a customer,
  I would like to add games to my game history,
  so that I can keep track of the games I have played.

  Background:
    Given a user exists in the database with email "user89@email.com", username "usern89", password "pass89"
    Given a game exists in the database with game name "Game1", game creator "Jojo" and game type "Adventure"
    Given a game exists in the database with game name "Game2", game creator "Frank" and game type "Action"

  Scenario: Add a new game to the game history (Normal Flow)
    Given the user with username "usern89" has a game history that does not contain game "Game1"
    When I make a POST request to "http://localhost:8000/users/game/add" with username "usern89" and game name "Game1"
    Then the response status code should be 200
    And the response should contain a status message "Success"
    And the response should contain a message "Game1 added to your history successfully."

  Scenario: Adding a game that already exists in history (Alternate Flow)
    Given the user with username "usern89" has a game history that contains valid game "Game1"
    When I make a POST request to "http://localhost:8000/users/game/add" with username "usern89" and game name "Game1"
    Then the response status code should be 400
    And the response should contain a status message "Failure"
    And the response should contain a message "Game1 is already in your history."

  Scenario: Adding a non-existent game to history (Error Flow)
    When I make a POST request to "http://localhost:8000/users/game/add" with username "usern89" and game name "Game3"
    Then the response status code should be 404
    And the response should contain a status message "Failure"
    And the response should contain a message "Game3 does not exist."