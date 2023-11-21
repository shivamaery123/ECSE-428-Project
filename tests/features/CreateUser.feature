Feature: Register User

As a user I want to be able to register my account so that I may use the game recommendation web application

Scenario: Register a user (Normal Flow)
Given I have a valid username, password and email for a new user
When I make a POST request with the user information to "http://localhost:8000/users/register"
Then the response status code should be 201
And the response should contain a status message "Success"
And the response should contain a message "User registered successfully"
And the response should contain the user with the username, password and email specified in the request
 
Scenario: No password provided in body of request to register a user (Error Flow)
Given I have a valid username and email but no password for a new user
When I make a POST request with the invalid user information to "http://localhost:8000/users/register"
Then the response status code should be 400
And the response should contain a status message "Failed"
And the response should contain a message "User was not created, error: SequelizeValidationError: notNull Violation: users.password cannot be null"

Scenario: Register a user wiith empty password (Error Flow)
Given I have a valid username and email and a password equal to empty string for a new user
When I make a POST request with the invalid user information to "http://localhost:8000/users/register"
Then the response status code should be 400
And the response should contain a status message "Failed"
And the response should contain a message "Email, password and username cannot be empty"