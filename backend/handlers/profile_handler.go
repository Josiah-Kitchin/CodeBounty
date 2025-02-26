/* Handles requests involving the profile table */

package handlers

import (
    "codebounty/models"
    "fmt"
    "github.com/gin-gonic/gin"
    "net/http"
)

func (h *Handler) AddProfile(c *gin.Context) {
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

    if err := h.repo.AddProfile(id, profile); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": "Could not add profile",
        })
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "Profile created", "error": ""})
}

func (h *Handler) UpdateProfile(c *gin.Context) {
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

    if err := h.repo.UpdateProfile(id, profile); err != nil {
        errorMessage := fmt.Sprintf("could not update profile: %s", err.Error())
        c.JSON(http.StatusInternalServerError, gin.H{"error": errorMessage})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "Profile updated", "error": ""})
}

func (h *Handler) GetProfileById(c *gin.Context) {
    /* Get a profile by their id
     * url: id
     * Response: { interests(string[]), error } */

    id, ok := getIdFromParam(c)
    if !ok {
        return
    }

    profile, err := h.repo.GetProfileById(id)
    if err != nil {
        errorMessage := fmt.Sprintf("Error getting profile by id: %s: ", err.Error())
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
        errorMessage := fmt.Sprintf("Could not bind json to profile: %s", err.Error())
        c.JSON(http.StatusBadRequest, gin.H{"error": errorMessage})
        return profile, false
    }
    return profile, true
}
