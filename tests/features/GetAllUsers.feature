
Feature: Get All Users

As an user, I want to be able to retrieve all registered users so that I can see the registered users

Background: 
Given a user exists in the database with email "user@gmail.com", username "username", password "user123"


Scenario: Retrieve all registered users (Normal Flow)
    When I make a GET request to "http://localhost:8000/users/all"
    Then the response status code should be 201
    And the response should contain a status message "Success"
    And the response should contain 1 users

Scenario: Attempt to retrieve registered users when there are none in the database (Alternate Flow)
    Given no users are registered in the system
    When I make a GET request to "http://localhost:8000/users/all"
    Then the response status code should be 201
    And the response should contain a status message "Success"
    And the response should contain 0 users

