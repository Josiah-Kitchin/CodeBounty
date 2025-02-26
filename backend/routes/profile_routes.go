package routes

import (
    "codebounty/handlers"
    "codebounty/middleware"
    "github.com/gin-gonic/gin"
)

func AttachProfileRoutes(h *handlers.Handler, router *gin.Engine) {

    router.POST("/profiles", middleware.AuthorizeRequest(), h.AddProfile)

    router.PUT("/profiles", middleware.AuthorizeRequest(), h.UpdateProfile)

    router.GET("/profiles/:id", middleware.AuthorizeRequest(), h.GetProfileById)

}
