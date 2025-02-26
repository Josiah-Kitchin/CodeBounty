/* Handles requests involving the user table */

package handlers

import (
    "codebounty/auth"
    "codebounty/models"
    "fmt"
    "net/http"

    "github.com/gin-gonic/gin"
)

func (h *Handler) RegisterUser(c *gin.Context) {
    /* Create a new user
       Expects {username, email, password}
       Returns {message, id, token} */

    user, ok := getUserData(c)
    if !ok {
        return
    }

    id, err := h.repo.AddUser(user)
    if err != nil {
        errorMessage := fmt.Sprintf("Could not add user: %s", err)
        c.JSON(http.StatusNotFound, gin.H{"error": errorMessage})
        return
    }

    token, err := auth.GenerateToken(id)
    if err != nil {
        errorMessage := fmt.Sprintf("Could not generate token: %s", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": errorMessage})
    }

    c.JSON(http.StatusCreated, gin.H{
        "message": "User created successfully",
        "id":      id,
        "token":   token,
        "error":   "",
    })
}

func (h *Handler) DeleteUser(c *gin.Context) {
    /* Delete a user from the database
       Expects { id, token }
       Returns { message } */

    id, ok := getIdFromRequest(c)
    if !ok { // errors are put in the context in getidfromcontext
        return
    }

    //Delete the user
    err := h.repo.DeleteUser(id)
    if err != nil {
        errorMessage := fmt.Sprintf("Could not delete user: %s", err)
        c.JSON(http.StatusNotFound, gin.H{"error": errorMessage})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "User deleted", "error": ""})
}

func (h *Handler) UpdateUser(c *gin.Context) {
    /* Update a users info
       Expects {id, ...}
       Returns { message } */

    id, ok := getIdFromRequest(c)
    if !ok {
        return
    }

    user, ok := getUserData(c)
    if !ok {
        return
    }

    if err := h.repo.UpdateUser(id, user); err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "User updated", "error": ""})
}

func (h *Handler) GetUsernameById(c *gin.Context) {
    /* Get a users username by their id
       Expects id in the url
       Returns { username } */

    id, ok := getIdFromParam(c)
    if !ok {
        return
    }

    username, err := h.repo.GetUsernameById(id)
    if err != nil {
        errorMessage := fmt.Sprintf("Error getting user by id: %s: ", err)
        c.JSON(http.StatusNotFound, gin.H{"error": errorMessage})
        return
    }

    c.JSON(http.StatusOK, gin.H{"username": username, "error": ""})
}

func (h *Handler) GetEmailById(c *gin.Context) {
    /* Get a users email by their id
       Expects id in the url
       Returns { email } */

    id, ok := getIdFromRequest(c)
    if !ok {
        return
    }

    //Get the username
    email, err := h.repo.GetEmailById(id)
    if err != nil {
        errorMessage := fmt.Sprintf("Error getting user by id: %s: ", err)
        c.JSON(http.StatusNotFound, gin.H{"error": errorMessage})
        return
    }

    c.JSON(http.StatusOK, gin.H{"email": email, "error": ""})
}

func (h *Handler) LogInUser(c *gin.Context) {
    /* Logs in a user by their email and password
       Expects { email, password }
       Returns { message, id, token} */

    user, ok := getUserData(c)
    if !ok {
        return
    }

    id, err := h.repo.LogInUser(user.Email, user.Password)
    if err != nil {
        errorMessage := fmt.Sprintf("Error logging in: %s", err)
        c.JSON(http.StatusNotFound, gin.H{"error": errorMessage})
        return
    }

    token, err := auth.GenerateToken(id)
    if err != nil {
        errorMessage := fmt.Sprintf("Could not generate token: %s", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": errorMessage})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "User Logged In", "id": id, "token": token, "error": ""})
}

/* ----------- Utils ---------- */

//Utils will fill the response with an error if they fail, so after calling the function
//in a handler function it just needs to return

func getUserData(c *gin.Context) (models.User, bool) {
    /* Fill a user struct with user data from the request */

    var user models.User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": "Invalid data",
        })
        return user, false
    }
    return user, true
}
