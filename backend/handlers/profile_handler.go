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

	id, ok := getIdFromRequest(c)
	if !ok {
		return
	}

	profile, ok := getProfileData(c)
	if !ok {
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

	id, ok := getIdFromRequest(c)
	if !ok {
		return
	}

	profile, ok := getProfileData(c)
	if !ok {
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

func getProfileData(c *gin.Context) (models.Profile, bool) {
	/* Fill a profile struct with profile data from the request */
	var profile models.Profile
	if err := c.ShouldBindJSON(&profile); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return profile, false
	}
	return profile, true
}
