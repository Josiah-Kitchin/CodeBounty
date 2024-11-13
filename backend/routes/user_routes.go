
package routes

import (
    "codebounty/handlers"
    "github.com/gin-gonic/gin"
)


func AttachUserRoutes(router *gin.Engine) {

    router.POST("/users", handlers.RegisterUser)

    router.POST("/users/login", handlers.LogInUser)

    router.DELETE("/users", handlers.DeleteUser)

    router.PUT("/users", handlers.UpdateUser)

    router.GET("/users/username/:id", handlers.GetUsernameById)

    router.GET("/users/email", handlers.GetEmailById)
}


