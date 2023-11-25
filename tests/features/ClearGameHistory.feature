Feature: Clear all games from game history

  As a customer,
  I would like to remove all games from my game history,
  so that I can clear my game preferences.

  Background:
    Given a user exists in the database with email "user89@email.com", username "usern89", password "pass89"
    Given a game exists in the database with game name "Game1", game creator "Jojo" and game type "Adventure"
    Given a game exists in the database with game name "Game2", game creator "Frank" and game type "Action"

  Scenario: Clear existing game history (Normal Flow)
    Given the user with username "usern89" has a game history that contains valid game "Game1" 
    Given the user with username "usern89" has a game history that contains valid game "Game2" 
    When I make a DELETE request to "http://localhost:8000/users/game/clear" with username "usern89"
    Then the response status code should be 200
    And the response should contain a status message "Success"
    And the response should contain a message "Game history cleared successfully."

  Scenario: Clearing game history with no games (Alternate Flow)
    When I make a DELETE request to "http://localhost:8000/users/game/clear" with username "usern89"
    Then the response status code should be 200
    And the response should contain a status message "Success"
    And the response should contain a message "No games in your history to clear."