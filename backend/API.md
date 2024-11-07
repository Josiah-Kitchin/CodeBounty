

# API Documentation

//NOTE: A token is required in the header for all requests other from creating a new user and logging in 
        The token should be grabbed from local storage and put into the header automatically by the axios instance

<--- Users --->

- Post /users: 

    Create a new user 

    Request --> { name, email, password }

    Response --> { status, id, token }

- Get /users/name/(USER ID HERE)

    Get a user's name by their id 

    Request --> { none }

    Response --> { status, name }

- Get /users/email/(USER ID HERE)

    Get a user's email by their id 

    Request --> { }

    Response --> { status, email }

- Put /users/( USER ID HERE)

    Update a user's data by their id 

    Request --> { name(optional), email(optional), password(optional), }

    Response --> { status }

- Delete /users/(USER ID HERE)

    Delete a user's data by their id 

    Request --> { none }

    Response --> { status }

- Post users/login

    Log in a user, compares the password with the given email and returns the status of the comparison
    and the id of the user 

    Request --> { email, password }

    Response --> { status, id, token }





<--- Profiles ---> 

- Post /profiles

    Create a new profile 

    Request --> {id(number) , interests(json) }

    //NOTE: the id should correspond to a user id

    Response --> { status }

- Put /profiles

    Update a profile

    //NOTE: The id is required, everything else is optional 

    Request --> {id(number), user_name(string), preferences(number) } 

    Response --> { status }

- Get /profiles/(USER ID HERE)

    Get a profile by their user id 

    Request --> { none }

    Response --> { status, profile(following earlier fields)}

