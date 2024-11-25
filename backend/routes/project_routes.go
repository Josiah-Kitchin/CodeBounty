package routes

import (
	"codebounty/handlers"
	"codebounty/middleware"
	"github.com/gin-gonic/gin"
)

func AttachProjectRoutes(h *handlers.Handler, router *gin.Engine) {

	router.POST("/projects", middleware.AuthorizeRequest(), h.AddProject)

	router.PUT("/projects", middleware.AuthorizeRequest(), h.UpdateProject)

	router.GET("/projects/user/:id", middleware.AuthorizeRequest(), h.GetProjectById)

	router.GET("/projects/:id", middleware.AuthorizeRequest(), h.GetProjectsByUserId)

	router.DELETE("/projects/:id", middleware.AuthorizeRequest(), h.DeleteProject)

	router.GET("/projects", middleware.AuthorizeRequest(), h.GetAllProjects)

	router.GET("/projects/matches", middleware.AuthorizeRequest(), h.GetMatchedProjects)
}
