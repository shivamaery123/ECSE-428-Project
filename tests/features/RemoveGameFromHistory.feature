Feature: Remove a game from game history

  As a customer,
  I would like to remove a game from my game history,
  so that I can delete any games I added by accident.

  Feature: Clear all games from game history

  As a customer,
  I would like to remove all games from my game history,
  so that I can clear my game preferences.

  Background:
    Given a user exists in the database with email "user@email.com", username "usern123", password "pass456"
    Given a game exists in the database with game name "Elden Ring", game creator "Jojo" and game type "Adventure"
    Given a game exists in the database with game name "Cyberpunk 2077", game creator "Frank" and game type "Action"

  Scenario: Remove existing game from game history (Normal Flow)
    Given the user with username "usern123" has a game history that contains valid game "Elden Ring" 
    When I make a DELETE request for the valid user "usern123" with the game "Elden Ring" to "http://localhost:8000/users/game/remove"
    Then the response status code for game removal be 200
    And the response for game removal should contain a status message "Success"
    And the response for game removal should contain a message "Game removed from history successfully."

  Scenario: Removing game that is not in game history (Error Flow)
    Given the user with username "usern123" has a game history that contains valid game "Cyberpunk 2077"
    When I make a DELETE request for the valid user "usern123" with the invalid game "Elden Ring" to "http://localhost:8000/users/game/remove"
    Then the response status code for game removal be 404
    And the response for game removal should contain a status message "Failed"
    And the response for game removal should contain a message "Game not found in history."

  Scenario: Removing game from empty game list (Error Flow)
    When I make a DELETE request for the valid user "usern123" with the invalid game "Elden Ring" to "http://localhost:8000/users/game/remove"
    Then the response status code for game removal be 404
    And the response for game removal should contain a status message "Failed"
    And the response for game removal should contain a message "No games are in your game history."