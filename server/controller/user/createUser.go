package user

import (
	"github.com/MatheusABA/restaurant-project/server/model/request"
	"github.com/MatheusABA/restaurant-project/server/utils"
	"github.com/gin-gonic/gin"
)

func CreateUser(c *gin.Context) {
	var userRequest request.UserRequest

	if err := c.ShouldBindJSON(&userRequest); err != nil {
		utils.Error(c, 400, "Invalid request body")
		return
	}

	utils.Success(c, 201, "User created successfully")
}
