package routes

import (
	"codebounty/handlers"
	"codebounty/middleware"
	"github.com/gin-gonic/gin"
)

func AttachUserRoutes(router *gin.Engine) {

	router.POST("/users", handlers.RegisterUser)

	router.POST("/users/login", handlers.LogInUser)

	router.DELETE("/users", middleware.AuthorizeRequest(), handlers.DeleteUser)

	router.PUT("/users", middleware.AuthorizeRequest(), handlers.UpdateUser)

	router.GET("/users/username/:id", middleware.AuthorizeRequest(), handlers.GetUsernameById)

	router.GET("/users/email", middleware.AuthorizeRequest(), handlers.GetEmailById)
}
