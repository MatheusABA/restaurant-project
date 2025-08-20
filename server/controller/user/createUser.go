package user

import (
	"github.com/MatheusABA/restaurant-project/server/controller/user/dto"
	services "github.com/MatheusABA/restaurant-project/server/services/user"
	"github.com/MatheusABA/restaurant-project/server/utils"
	"github.com/gin-gonic/gin"
)

func CreateUser(c *gin.Context) {
	var userRequest dto.CreateUserRequest

	if err := c.ShouldBindJSON(&userRequest); err != nil {
		utils.Error(c, 400, "Invalid request body")
		return
	}

	if err := services.CreateUser(userRequest); err != nil {
		utils.Error(c, 400, err.Error())
		return
	}

	utils.Success(c, 201, "User created successfully")
}
