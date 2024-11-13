
package routes

import (
    "codebounty/handlers"
    "github.com/gin-gonic/gin"
)

func AttachProfileRoutes(router *gin.Engine) {

    router.POST("/profiles", handlers.AddProfile)

    router.PUT("/profiles", handlers.UpdateProfile)

    router.GET("/profiles/:id", handlers.GetProfileById)

}
