Feature: Get game history information

  As a customer,
  I would like to retrieve my game history,
  so that I can view my list of played games.

 Background:
   Given I am logged in as a regular user with username "username123" and email "user@email.com"
   And the following games exist
   | game_name   | game_creator  | game_type   |
   | Game1       | Creator1      | Action      |
   | Game2       | Creator2      | Adventure   |
   | Game3       | Creator3      | Sports      |
   | Game4       | Creator4      | RPG         |
   And user with username "username123" has the following games in their game history
   | game_name   |
   | Game1       |
   | Game2       |

 Scenario: Retrieve user game history (Normal Flow)
   When I make a GET request to "http://localhost:8000/users/game/history?username=username123"
   Then the response status code should be 200
   And the response should contain a status message "Success"
   And the response should display the following games in my game history
   | game_name   |
   | Game1       |
   | Game2       |

 Scenario: Retrieve game history for a user that doesn't exist (Error Flow)
  When I make a GET request to "http://localhost:8000/users/game/history?username=fakeuser"
  Then the response status code should be 404
  And the response should contain a status message "Failed"