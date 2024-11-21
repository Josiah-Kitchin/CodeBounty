package routes

import (
	"codebounty/handlers"
	"codebounty/middleware"
	"github.com/gin-gonic/gin"
)

func AttachUserRoutes(h *handlers.Handler, router *gin.Engine) {

	router.POST("/users", h.RegisterUser)

	router.POST("/users/login", h.LogInUser)

	router.DELETE("/users", middleware.AuthorizeRequest(), h.DeleteUser)

	router.PUT("/users", middleware.AuthorizeRequest(), h.UpdateUser)

	router.GET("/users/username/:id", middleware.AuthorizeRequest(), h.GetUsernameById)

	router.GET("/users/email", middleware.AuthorizeRequest(), h.GetEmailById)
}
