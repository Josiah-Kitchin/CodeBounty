

package middleware

import (
    "codebounty/auth"
    "github.com/gin-gonic/gin"
    "net/http"
    "strings"
)


func AuthorizeRequest() gin.HandlerFunc {
    /* Authorize requests by verifying the token in the header */

    return func(c * gin.Context) {
	tokenHeader := c.GetHeader("token")
	if tokenHeader == "" {
	    c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing Token header"})
	    c.Abort()
	    return
	}

	tokenParts := strings.Split(tokenHeader, ":")
	if len(tokenParts) != 2 || tokenParts[0] != "token" {
	    c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token header format"})
	    c.Abort()
	    return
	}

	token := tokenParts[1]
	id, err := auth.VerifyToken(token)
	if err != nil {
	    c.JSON(http.StatusUnauthorized, gin.H{"error": "User Unauthorized"})
	    c.Abort()
	}

	c.Set("id", id)
	c.Next()
    }
} 
