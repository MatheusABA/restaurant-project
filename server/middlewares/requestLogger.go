package middleware

import (
	"time"

	"github.com/MatheusABA/restaurant-project/server/utils"
	"github.com/gin-gonic/gin"
)

func RequestLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		path := c.Request.URL.Path
		method := c.Request.Method

		c.Next() // Process request

		status := c.Writer.Status()
		latency := time.Since(start)

		utils.LogInfo("%s %s %d %s", method, path, status, latency)
	}
}
