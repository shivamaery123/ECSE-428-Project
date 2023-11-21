Feature: Clear all games from game history

  As a customer,
  I would like to remove all games from my game history,
  so that I can clear my game preferences.

  Background:
    Given I am logged in as a regular user with username "username1" and email "user@email.com"

  Scenario: Clear existing game history (Normal Flow)
    Given My game history contains "Elden Ring" and "Cyberpunk 2077"
    When I make a DELETE request to "http://localhost:8000/users/game/clear" with email "user@email.com"
    Then the response status code should be 200
    And the response should contain a status message "Success"
    And the response should contain a message "Game history cleared successfully."

  Scenario: Clearing game history with no games (Alternate Flow)
    Given My game history does not contain any games
    When I make a DELETE request to "http://localhost:8000/users/game/clear"
    Then the response status code should be 200
    And the response should contain a status message "Success"
    And the response should contain a message "No games in your history to clear."