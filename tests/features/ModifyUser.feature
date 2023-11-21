Feature: Modify a User

As a user I want to modify my account so that I can change my account details whenever desired

Background:
Given a user exists in the database with email "joe@mail.ca", username "joe", password "pass"

Scenario: Change password for a user with email provided (Normal Flow)
When I make a PUT request with the user information to "http://localhost:8000/users/user" with original email "joe@mail.ca" and new email "", username "" and password "newpass" and original password "pass"
Then the response should contain a message "User modified successfully"
And the response status code should be 200
And the response should contain a status message "Success"
And the response should contain the user with email "joe@mail.ca", username "joe" and password "newpass"
And there shall be a user in the system with email "joe@mail.ca", username "joe" and password "newpass"

Scenario: Change password and username for a user with email provided (Alternate Flow)
When I make a PUT request with the user information to "http://localhost:8000/users/user" with original email "joe@mail.ca" and new email "", username "adam" and password "newpass" and original password "pass"
Then the response status code should be 200
And the response should contain a status message "Success"
And the response should contain a message "User modified successfully"
And the response should contain the user with email "joe@mail.ca", username "adam" and password "newpass"
And there shall be a user in the system with email "joe@mail.ca", username "adam" and password "newpass"

Scenario: Change password, username and email for a user with email provided (Alternate Flow)
When I make a PUT request with the user information to "http://localhost:8000/users/user" with original email "joe@mail.ca" and new email "adam@mail.ca", username "adam" and password "newpass" and original password "pass"
Then the response status code should be 200
And the response should contain a status message "Success"
And the response should contain a message "User modified successfully"
And the response should contain the user with email "adam@mail.ca", username "adam" and password "newpass"
And there shall be a user in the system with email "adam@mail.ca", username "adam" and password "newpass"

Scenario: Change password for a user with non-existant email (Error Flow)
When I make a PUT request with the user information to "http://localhost:8000/users/user" with original email "adam@mail.ca" and new email "", username "" and password "newpass" and original password "pass"
Then the response status code should be 404
And the response should contain a status message "Failed"
And the response should contain a message "User does not exist."
And there shall be a user in the system with email "joe@mail.ca", username "joe" and password "pass"

