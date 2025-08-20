package utils

import "github.com/gin-gonic/gin"

type AppError struct {
	Status  int
	Message string
}

func (error *AppError) Error() string {
	return error.Message
}

func Success(c *gin.Context, status int, data any) {
	c.JSON(status, data)
}

func Error(c *gin.Context, status int, message string) {
	c.JSON(status, gin.H{
		"status": status,
		"error":  message,
	})
}
