Feature: Game History Management

  As a customer,
  I would like to add a game to my game history,
  So that I may receive more accurate game recommendations.

  Background:
    Given the customer is logged into their account

  Scenario: Customer adds a new game to their game history
    Given the customer is on their game history page
    When the customer adds a new game "Elden Ring" to their history
    Then "Elden Ring" should be displayed in their game history

  Scenario: Customer adds an already existing game in their history
    Given the customer already has "Cyberpunk 2077" in their game history
    When the customer tries to add "Cyberpunk 2077" again
    Then a message should be displayed indicating the game is already in the history

  Scenario: Customer adds a game without selecting a title
    When the customer tries to add a game without selecting a title
    Then an error message should be displayed prompting to select a game

  Scenario: Customer receives updated recommendations after adding a game
    Given the customer has added "The Witcher 3" to their game history
    When the customer navigates to the recommendations page
    Then the recommendations should be updated based on the addition of "The Witcher 3"

  Scenario: Customer views game history
    Given the customer has added several games to their history
    When the customer navigates to their game history page
    Then all added games should be listed in their game history