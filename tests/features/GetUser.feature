Feature: Get user details

As a user, I want to retrieve my account details using my email or username so that I can view my personal information.

Background:
Given I am logged in as a regular user with username "username123" and email "user@email.com"

Scenario: Retrieve user details using a valid email (Normal Flow)
When I make a GET request to "http://localhost:8000/users/user" with my valid email "user@email.com"
Then the response status code should be 200
And the response should contain a status message "Success"
And the response should contain my user details for the email "user@email.com"

Scenario: Retrieve user details using a valid username (Alternate Flow)
When I make a GET request to "http://localhost:8000/users/user" with my valid username "username123"
Then the response status code should be 200
And the response should contain a status message "Success"
And the response should contain my user details for the username "username123"

Scenario: Attempt to retrieve user details using another user's email (Error Flow)
When I make a GET request to "http://localhost:8000/users/user" with another user's email "anotheruser@email.com"
Then the response status code should be 403
And the response should contain a status message "Access Denied: Unauthorized access"

Scenario: Attempt to retrieve user details using another user's username (Error Flow)
When I make a GET request to "http://localhost:8000/users/user" with another user's username "anotheruser"
Then the response status code should be 403
And the response should contain a status message "Access Denied: Unauthorized access"

Scenario: Attempt to retrieve user details using an invalid email (Error Flow)
When I make a GET request to "http://localhost:8000/users/user" with an invalid email "invalid@email.com"
Then the response status code should be 404
And the response should contain a status message "User not found"

Scenario: Attempt to retrieve user details using an invalid username (Error Flow)
When I make a GET request to "http://localhost:8000/users/user" with an invalid username "invaliduser"
Then the response status code should be 404
And the response should contain a status message "User not found"
