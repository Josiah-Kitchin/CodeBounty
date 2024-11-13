

package main

import (
    "github.com/gin-gonic/gin"
    "codebounty/routes"
    "github.com/gin-contrib/cors"
)


func main() { 

    router := gin.Default()

    //Allow cross origin 
    router.Use(cors.Default())

    routes.AttachUserRoutes(router)
    routes.AttachProfileRoutes(router)


    router.Static("/static", "../frontend/build/static")
    //Set any route not specified to the page
    router.NoRoute(func(c *gin.Context) {
	c.File("../frontend/build/index.html")
    })


    router.Run(":8080")
}

