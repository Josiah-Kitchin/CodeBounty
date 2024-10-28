

# API Documentation

<--- Users --->

- Post /users: 

    Create a new user 

    Request --> { name, email, password }

    Response --> { status }

- Get /users/name/(USER ID HERE)

    Get a user's name by their id 

    Request --> { none }

    Response --> { status, name }

- Get /users/email/(USER ID HERE)

    Get a user's email by their id 

    Request --> { none }

    Response --> { status, email }

- Put /users/( USER ID HERE)

    Update a user's data by their id 

    Request --> { name(optional), email(optional), password(optional) }

    Response --> { status }

- Delete /users/(USER ID HERE)

    Delete a user's data by their id 

    Request --> { none }

    Response --> { status }

- Post /login

    Log in a user, compares the password with the given email and returns the status of the comparison
    and the id of the user 

    Request --> { email, password }

    Response --> { status, id }

<--- Profiles ---> 

- Post /profiles

    Create a new profile 

    Request --> {id(number), bio(string), age(number), gender(male, female, other), preferences(json), 
                 profile_picture(string NOT WORKING RN), location(strign)}

    //NOTE: the id should correspond to a user id

    Response --> { status }

- Put /profiles

    Update a profile

    //NOTE: The id is required, everything else is optional 

    Request --> {id(number), bio(string), age(number), gender(male, female, other), preferences(json), 
                 profile_picture(NOT WORKING RN), location(string)}

    Response --> { status }

- Get /profiles/(USER ID HERE)

    Get a profile by their user id 

    Request --> { none }

    Response --> { status, profile(following earlier fields)}

