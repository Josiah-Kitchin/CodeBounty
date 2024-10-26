

# API Documentation

<--- Users --->

- Post /users: 
    Create a new user 
    Request --> { name, email, password }
    Response --> { status }

- Get /users/name/<id>
    Get a user's name by their id 
    Request --> { none }
    Response --> { status, name }

- Get /users/email/<id>
    Get a user's email by their id 
    Request --> { none }
    Response --> { status, email }

- Put /users/<id>
    Update a user's data by their id 
    Request --> { name(optional), email(optional), password(optional) }
    Response --> { status }

- Delete /users/<id>
    Delete a user's data by their id 
    Request --> { none }
    Response --> { status }

- Post /users/login
    Login a user, compares the password with the given email and returns wthe status of the comparison
    Request --> { email, password }
    Response --> { status }




