Feature: Add a game to game history

  As a customer,
  I would like to add a game to my game history,
  so that I may receive more accurate game recommendations.

#  Background:
#    Given I am logged in as a regular user with username "username123" and email "user@email.com"
#
#  Scenario: Add a game to game history (Normal Flow)
#    Given I have a valid game to add to my game history
#    When I make a POST request with the game "Elden Ring" to "http://localhost:8000/users/game/add"
#    Then the response status code should be 200
#    And the response should contain a status message "Success"
#    And the response should contain a message "Game added to history successfully."
#
#  Scenario: Adding a game that is already in game history (Alternate Flow)
#    Given I already have the game "Elden Ring" in my game history
#    When I make a POST request with the game "Elden Ring" to "http://localhost:8000/users/game/add"
#    Then the response status code should be 200
#    And the response should contain a status message "Success"
#    And the response should contain a message "Game already added to game history."