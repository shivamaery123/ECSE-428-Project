Feature: Delete a user

As a user I want to be delete my account so that I no longer have access to the application

Background: 
Given a user exists in the database

Scenario: Delete a user with email and username provided (Normal Flow)
When I make a DELETE request with the user information to "http://localhost:8000/users/user" with a valid username "shivam123" and valid email "shivam.aery@mail.mcgill.ca"
Then the response status code for deletion should be 200
And the response for deletion should contain a status message "Success"
And the response for deletion should contain a message "User deleted successfully"
 
Scenario: Delete a user with no email, only username provided (Alternate Flow)
When I make a DELETE request with the user information to "http://localhost:8000/users/user" with a valid username "shivam123" and no email
Then the response status code for deletion should be 200
And the response for deletion should contain a status message "Success"
And the response for deletion should contain a message "User deleted successfully" 

Scenario: Delete a user with a non-existent username (Error Flow)
When I make a DELETE request with the user information to "http://localhost:8000/users/user" with a non existent username "nonexistent123"
Then the response status code for deletion should be 404
And the response for deletion should contain a message "User not found" 
