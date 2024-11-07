

# API Documentation

<--- Users --->

- Post /users: 

    Create a new user 

    Request --> { name, email, password }

    Response --> { status, id, token }

- Get /users/name/(USER ID HERE)

    Get a user's name by their id 

    Request --> { token }

    Response --> { status, name }

- Get /users/email/(USER ID HERE)

    Get a user's email by their id 

    Request --> { token }

    Response --> { status, email }

- Put /users/( USER ID HERE)

    Update a user's data by their id 

    Request --> { name(optional), email(optional), password(optional), token }

    Response --> { status }

- Delete /users/(USER ID HERE)

    Delete a user's data by their id 

    Request --> { token }

    Response --> { status }

- Post users/login

    Log in a user, compares the password with the given email and returns the status of the comparison
    and the id of the user 

    Request --> { email, password }

    Response --> { status, id, token }





<--- Profiles ---> 

- Post /profiles

    Create a new profile 

    Request --> {id(number) , interests(json), token}

    //NOTE: the id should correspond to a user id

    Response --> { status }

- Put /profiles

    Update a profile

    //NOTE: The id and token is required, everything else is optional 

    Request --> {id(number), user_name(string), preferences(number), token} 

    Response --> { status }

- Get /profiles/(USER ID HERE)

    Get a profile by their user id 

    Request --> { token }

    Response --> { status, profile(following earlier fields)}

