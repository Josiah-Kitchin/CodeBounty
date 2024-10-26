

# API Documentation

<--- Users --->

- Post /api/users: 
    Create a new user 
    Request --> { name, email, password }
    Response --> { status }

- Get /api/users/name/<id>
    Get a user's name by their id 
    Request --> { none }
    Response --> { status, name }

- Get /api/users/email/<id>
    Get a user's email by their id 
    Request --> { none }
    Response --> { status, email }

- Put /api/users/<id>
    Update a user's data by their id 
    Request --> { name(optional), email(optional), password(optional) }
    Response --> { status }

- Delete /api/users/<id>
    Delete a user's data by their id 
    Request --> { none }
    Response --> { status }

- Post /users/login
    Log in a user, compares the password with the given email and returns wthe status of the comparison
    Request --> { email, password }
    Response --> { status }




