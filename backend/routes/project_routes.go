package routes

import (
	"codebounty/handlers"
	"codebounty/middleware"
	"github.com/gin-gonic/gin"
)

func AttachProjectRoutes(router *gin.Engine) {

	router.POST("/projects", middleware.AuthorizeRequest(), handlers.AddProject)

	router.PUT("/projects", middleware.AuthorizeRequest(), handlers.UpdateProject)

	router.GET("/projects/user/:id", middleware.AuthorizeRequest(), handlers.GetProjectById)

	router.GET("/projects/:id", middleware.AuthorizeRequest(), handlers.GetProjectsByUserId)

	router.DELETE("/projects/:id", middleware.AuthorizeRequest(), handlers.DeleteProject)

}
