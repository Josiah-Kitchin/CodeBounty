
package main

import (
    "github.com/gin-gonic/gin"
    "codebounty/routes"
)


func main() { 

    router := gin.Default()
    routes.AttachUserRoutes(router)


    router.Run(":8080")
}

