package routes

import (
	"codebounty/handlers"
	"codebounty/middleware"
	"github.com/gin-gonic/gin"
)

func AttachProfileRoutes(router *gin.Engine) {

	router.POST("/profiles", middleware.AuthorizeRequest(), handlers.AddProfile)

	router.PUT("/profiles", middleware.AuthorizeRequest(), handlers.UpdateProfile)

	router.GET("/profiles/:id", middleware.AuthorizeRequest(), handlers.GetProfileById)

}
