package middleware

import (
    "bytes"
    "io/ioutil"
    "log"
    "time"

    "github.com/gin-gonic/gin"
)

func LogRequests() gin.HandlerFunc {
    return func(c *gin.Context) {
        startTime := time.Now()

        // Read and log request body (restore it later)
        var requestBody string
        if c.Request.Body != nil {
            bodyBytes, _ := ioutil.ReadAll(c.Request.Body)
            requestBody = string(bodyBytes)
            // Restore the request body for later use
            c.Request.Body = ioutil.NopCloser(bytes.NewBuffer(bodyBytes))
        }

        // Log headers
        headers := c.Request.Header

        // Process request
        c.Next()

        // Calculate latency
        latency := time.Since(startTime)

        // Get the status code
        statusCode := c.Writer.Status()

        // Log request details
        log.Printf(`
        Method: %s
        Path: %s
        Status: %d
        Latency: %v
        IP: %s
        Headers: %v
        Query Params: %s
        Request Body: %s
    `,
            c.Request.Method,
            c.Request.URL.Path,
            statusCode,
            latency,
            c.ClientIP(),
            headers,
            c.Request.URL.RawQuery,
            requestBody,
        )
    }
}
