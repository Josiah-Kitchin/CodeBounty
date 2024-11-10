
package routes

import (
    "codebounty/handlers"
    "github.com/gin-gonic/gin"
)


func AttachUserRoutes(router *gin.Engine) {
    router.POST("/users", handlers.RegisterUser)
}


