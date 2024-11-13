
# API Doc
---

## Auth
---
To authenticate, you need to provide a token in your header in all requests other from getting the main page, 
logging in, and creating an account. 

When you log in or create an account, an id and token will be in the response. The token should then be put into 
local storage to be used for later requests. The id is encrypted in the token, so the server can verify if the user
with that id is allowed to make that request. No need to send it in the request  

## Errors:
---
All requests with respond with an error key in the json. If there is an error however, 
the only key will be the error key.

## Users
---

### POST /users

Register a new user. 

Request: { username, email, password }

Response: { token, id, message, error }

### POST /users/login 

Login a user

Request: { email, password }

Response: { token, id, message, error }

### DELETE /users

Delete a user, also deletes all tables with the associated id 

Request: { token }

Response: { message, error }

### PUT /users

Update a users username, email, or password

Request: { token, username?, email?, password? } 

Response: { message, error }

### GET /users/username/:id

Get a user's username by their id in the url 

Request: { token }

Response: { username, error }

### GET /users/email

Get a user's email by their id'

Request: { token }

Response: { email, error }


## Profiles
---

### POST /profiles

Create a new profile

Request: { interests(string[]), token }

Response: { message, error }

### PUT /profiles

Update a profile 

Request: { interests(string[]), token}

Response: { message, error }

### GET /profiles/:id

Get a profile by their user id 

Request { token }

Response: { interests(string[]), error }

