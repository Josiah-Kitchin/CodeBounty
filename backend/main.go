package main

import (
    "codebounty/middleware"
    "codebounty/routes"
    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
)

func main() {

    router := gin.Default()

    //Allow cross origin
    router.Use(cors.Default())
    router.Use(middleware.LogRequests())

    routes.AttachUserRoutes(router)
    routes.AttachProfileRoutes(router)

    router.Static("/static", "../frontend/build/static")
    //Set any route not specified to the page
    router.NoRoute(func(c *gin.Context) {
	c.File("../frontend/build/index.html")
    })

    router.Run(":3000")
}
