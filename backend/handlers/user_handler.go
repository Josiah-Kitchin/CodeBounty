

/* Handles requests involving the user table */ 


package handlers

import (
    "github.com/gin-gonic/gin"
    "codebounty/models"
    "net/http"
    "codebounty/auth"
    "fmt"
    "strconv"
)


func RegisterUser(c *gin.Context) {
    /* Create a new user
       Expects {username, email, password} 
       Returns {message, id, token} */
    
    var user models.User
    if ok := fillUserData(&user, c); !ok {
	return 
    }

    id, err := models.AddUser(user)
    if err != nil {
	errorMessage := fmt.Sprintf("Could not add user: %s", err)
	c.JSON(http.StatusNotFound, gin.H{ "error": errorMessage })
	return 
    }

    token, err := auth.GenerateToken(id)
    if err != nil {
	errorMessage := fmt.Sprintf("Could not generate token: %s", err)
	c.JSON(http.StatusInternalServerError, gin.H{ "error": errorMessage })
    }

    c.JSON(http.StatusCreated, gin.H{
        "message": "User created successfully",
        "id": id,
	"token": token,
    })
}

func DeleteUser(c *gin.Context) {
    /* Delete a user from the database 
       Expects { id, token }
       Returns { message } */

    id, ok := getIdFromRequest(c)
    if !ok { // errors are put in the context in getidfromcontext
	return
    }

    //Delete the user 
    err := models.DeleteUser(id); if err != nil {
	errorMessage := fmt.Sprintf("Could not delete user: %s", err)
	c.JSON(http.StatusNotFound, gin.H{ "error": errorMessage })
	return
    }

    c.JSON(http.StatusOK, gin.H{ "message": "User deleted" })
}

func UpdateUser(c *gin.Context) {
    /* Update a users info 
       Expects {id, ...}
       Returns { message } */


    id, ok := getIdFromRequest(c)
    if !ok {
	return
    }

    var user models.User
    if ok := fillUserData(&user, c); !ok {
	return 
    }

    if err := models.UpdateUser(id, user); err != nil {
	c.JSON(http.StatusNotFound, gin.H{ "error": err })
	return 
    }
    c.JSON(http.StatusOK, gin.H{ "message": "User updated"})
}

func GetUsernameById(c *gin.Context) {
    /* Get a users username by their id 
       Expects id in the url
       Returns { username } */
    
    id, ok := getIdFromParam(c)
    if !ok {
	return 
    }
    
    username, err := models.GetUsernameById(id) 
    if err != nil {
	errorMessage := fmt.Sprintf("Error getting user by id: %s: ", err)
	c.JSON(http.StatusNotFound, gin.H{ "error": errorMessage})
	return 
    }

    c.JSON(http.StatusOK, gin.H{ "username": username })
}

func GetEmailById(c *gin.Context) {
    /* Get a users email by their id 
       Expects id in the url
       Returns { email } */
    
    id, ok := getIdFromRequest(c)
    if !ok {
	return 
    }

    //Get the username
    email, err := models.GetEmailById(id) 
    if err != nil {
	errorMessage := fmt.Sprintf("Error getting user by id: %s: ", err)
	c.JSON(http.StatusNotFound, gin.H{ "error": errorMessage})
	return 
    }

    c.JSON(http.StatusOK, gin.H{ "email": email})
}


func LogInUser(c *gin.Context) {
    /* Logs in a user by their email and password 
       Expects { email, password }
       Returns { message, id, token} */

    var user models.User
    if ok := fillUserData(&user, c); !ok {
	return 
    }
    
    id, err := models.LogInUser(user.Email, user.Password)
    if err != nil {
	errorMessage := fmt.Sprintf("Error logging in: %s", err)
	c.JSON(http.StatusNotFound, gin.H{ "error": errorMessage })
    }

    token, err := auth.GenerateToken(id)
    if err != nil {
	errorMessage := fmt.Sprintf("Could not generate token: %s", err)
	c.JSON(http.StatusInternalServerError, gin.H{ "error": errorMessage })
    }

    c.JSON(http.StatusOK, gin.H{ "message": "User Logged In", "id": id, "token": token })
}




/* ----------- Utils ---------- */

//Utils will fill the response with an error if they fail, so after calling the function 
//in a handler function it just needs to return 

func getIdFromRequest(c *gin.Context) (uint, bool) {
    /* Get the id from a *gin.Context (assuming id was added by middleware) */

    id, ok := c.Get("id")
    if !ok {
	c.JSON(http.StatusInternalServerError, gin.H { "error": "Failed to get ID from token" })
	return 0, false 
    }
    //Check that id is an unsigned integer
    idVal, ok := id.(uint)
    if !ok {
	c.JSON(http.StatusBadRequest, gin.H { "error": "ID is not an unsigned integer" })
	return 0, false 
    }
    return idVal, true
}

func getIdFromParam(c *gin.Context) (uint, bool) {
    /* Get the id from a url */

    idStr := c.Param("id")
    id64, err := strconv.ParseUint(idStr, 10, 64)
    if err != nil {
	c.JSON(http.StatusBadRequest, gin.H{ "error": "ID not of type unsigned integer"})
	return 0, false
    }
    return uint(id64), true
}

func fillUserData(user *models.User, c *gin.Context) (bool) {
    /* Fill a user struct with user data from the request */

    if err := c.ShouldBindJSON(user); err != nil {
	c.JSON(http.StatusBadRequest, gin.H{
            "error": "Invalid data",
        })
	return false
    }
    return true
}






