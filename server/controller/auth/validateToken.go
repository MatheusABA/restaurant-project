package auth

import (
	"net/http"
	"os"
	"strings"

	"github.com/MatheusABA/restaurant-project/server/utils"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func ValidateToken(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
		utils.Error(c, http.StatusUnauthorized, "Missing or invalid Authorization header")
		return
	}

	tokenString := strings.TrimPrefix(authHeader, "Bearer ")
	secret := os.Getenv("JWT_SECRET")

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (any, error) {
		return []byte(secret), nil
	})

	if err != nil || !token.Valid {
		utils.Error(c, http.StatusUnauthorized, "Invalid or expired token")
		return
	}

	utils.Success(c, http.StatusOK, gin.H{"valid": true})
}
