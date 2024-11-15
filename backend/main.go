package main

import (
    "codebounty/middleware"
    "codebounty/routes"
    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
    "github.com/joho/godotenv"
    "os"
    "log"
)

func main() {

    //Load env variables
    if err := godotenv.Load(); err != nil {
	log.Fatal("Error loading .env file: ", err)
    }

    router := gin.Default()

    //Middleware
    router.Use(cors.Default()) //allow cross origin
    router.Use(middleware.LogRequests())

    //Routes
    routes.AttachUserRoutes(router)
    routes.AttachProfileRoutes(router)

    router.Static("/static", "../frontend/build/static")
    //Set any route not specified to the page
    router.NoRoute(func(c *gin.Context) {
	c.File("../frontend/build/index.html")
    })

    router.Run(":" + os.Getenv("PORT"))
}
