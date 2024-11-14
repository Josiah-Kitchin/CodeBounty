/* Handles requests involving the profile table */

package handlers

import (
	"codebounty/models"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func AddProfile(c *gin.Context) {
	/* Add a new profile
	 * Request: { interests(string[]) }
	 * Response: { message, error } */

	id, ok := getIdFromParam(c)
	if !ok {
		return
	}

	var profile models.Profile
	if ok := fillProfileData(&profile, c); !ok {
		return
	}

	if err := models.AddProfile(id, profile); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Could not add profile",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Profile created", "error": ""})
}

func UpdateProfile(c *gin.Context) {
	/* Update a profile
	 * Request: { interests(string[]) }
	 * Response: { message, error } */

	id, ok := getIdFromParam(c)
	if !ok {
		return
	}

	var profile models.Profile
	if ok := fillProfileData(&profile, c); !ok {
		return
	}

	if err := models.UpdateProfile(id, profile); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Could not update profile",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Profile updated", "error": ""})
}

func GetProfileById(c *gin.Context) {
	/* Get a profile by their id
	 * url: id
	 * Response: { interests(string[]), error } */

	id, ok := getIdFromParam(c)
	if !ok {
		return
	}

	profile, err := models.GetProfileById(id)
	if err != nil {
		errorMessage := fmt.Sprintf("Error getting profile by id: %s: ", err)
		c.JSON(http.StatusNotFound, gin.H{"error": errorMessage})
		return
	}

	c.JSON(http.StatusOK, gin.H{"interests": profile.Interests, "error": ""})
}

/* --- Utils --- */

func fillProfileData(profile *models.Profile, c *gin.Context) bool {
	/* Fill a user struct with user data from the request */

	if err := c.ShouldBindJSON(profile); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid data",
		})
		return false
	}
	return true
}
