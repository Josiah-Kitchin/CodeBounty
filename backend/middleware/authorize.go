package middleware

import (
	"codebounty/auth"
	"github.com/gin-gonic/gin"
	"net/http"
)

func AuthorizeRequest() gin.HandlerFunc {
    /* Authorize requests by verifying the token in the header */

    return func(c *gin.Context) {
	token := c.GetHeader("Token")
	if token == "" {
	    c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing Token header"})
	    c.Abort()
	    return
	}

	id, err := auth.VerifyToken(token)
	if err != nil {
	    c.JSON(http.StatusUnauthorized, gin.H{"error": "User Unauthorized"})
	    c.Abort()
	}

	c.Set("id", id)
	c.Next()
    }
}
