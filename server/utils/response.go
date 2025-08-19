package utils

import "github.com/gin-gonic/gin"

func Success(c *gin.Context, status int, data any) {
	c.JSON(status, gin.H{
		"data": data,
	})
}

func Error(c *gin.Context, status int, message string) {
	c.JSON(status, gin.H{
		"status": status,
		"error":  message,
	})
}
