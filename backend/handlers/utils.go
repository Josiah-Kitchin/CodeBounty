package handlers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func getIdFromParam(c *gin.Context) (uint, bool) {
	/* Get the id from a url */

	idStr := c.Param("id")
	id64, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID in param not of type unsigned integer"})
		return 0, false
	}
	return uint(id64), true
}

func getIdFromRequest(c *gin.Context) (uint, bool) {
	/* Get the id from a *gin.Context (assuming id was added by middleware) */

	id, ok := c.Get("id")
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get ID from token"})
		return 0, false
	}
	//Check that id is an unsigned integer
	idVal, ok := id.(uint)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID in token is not an unsigned integer"})
		fmt.Println(id)
		return 0, false
	}
	return idVal, true
}
