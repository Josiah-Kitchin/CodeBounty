package routes

import (
	"codebounty/handlers"
	"codebounty/middleware"
	"github.com/gin-gonic/gin"
)

func Attach(router *gin.Engine) {

	router.POST("/projects", middleware.AuthorizeRequest(), handlers.AddProject)

	router.PUT("/projects", middleware.AuthorizeRequest(), handlers.UpdateProject)

	router.DELETE("/users", middleware.AuthorizeRequest(), handlers.DeleteUser)

	router.PUT("/users", middleware.AuthorizeRequest(), handlers.UpdateUser)

	router.GET("/users/username/:id", middleware.AuthorizeRequest(), handlers.GetUsernameById)

	router.GET("/users/email", middleware.AuthorizeRequest(), handlers.GetEmailById)
}
