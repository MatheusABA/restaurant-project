package auth

import (
	"github.com/MatheusABA/restaurant-project/server/controller/auth/dto"
	"github.com/MatheusABA/restaurant-project/server/services"
	"github.com/MatheusABA/restaurant-project/server/utils"
	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {
	var req dto.AuthRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		utils.Error(c, 400, "Invalid request body")
		return
	}

	token, err := services.AuthenticateUser(req)
	if err != nil {
		utils.Error(c, 401, err.Error())
		return
	}

	utils.Success(c, 200, dto.AuthResponse{Token: token})
}
