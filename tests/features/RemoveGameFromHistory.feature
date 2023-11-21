Feature: Remove a game from game history

  As a customer,
  I would like to remove a game from my game history,
  so that I can delete any games I added by accident.

  Feature: Clear all games from game history

  As a customer,
  I would like to remove all games from my game history,
  so that I can clear my game preferences.

#  Background:
#    Given I am logged in as a regular user with username "username123" and email "user@email.com"
#
#  Scenario: Clear existing game history (Normal Flow)
#    Given My game history contains "Elden Ring" and "Cyberpunk 2077"
#    When I make a DELETE request with the game "Elden Ring" to "http://localhost:8000/users/game/remove"
#    Then the response status code should be 200
#    And the response should contain a status message "Success"
#    And the response should contain a message "Game removed from history successfully."
#
#  Scenario: Removing game that is not in game history (Error Flow)
#    Given My game history does not contains "Elden Ring"
#    When I make a DELETE request with the game "Cyberpunk 2077" to "http://localhost:8000/users/game/remove"
#    Then the response status code should be 404
#    And the response should contain a status message "Failed"
#    And the response should contain a message "Game not found in history."
#
#  Scenario: Removing game from empty game list (Error Flow)
#    Given My game history does not contain any games
#    When I make a DELETE request with the game "Cyberpunk 2077" to "http://localhost:8000/users/game/remove"
#    Then the response status code should be 404
#    And the response should contain a status message "Failed"
#    And the response should contain a message "No games are in your game history."