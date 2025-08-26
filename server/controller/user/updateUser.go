package user

import (
	"github.com/MatheusABA/restaurant-project/server/controller/user/dto"
	"github.com/MatheusABA/restaurant-project/server/services"
	"github.com/MatheusABA/restaurant-project/server/utils"
	"github.com/gin-gonic/gin"
)

func UpdateUser(c *gin.Context) {
	var req dto.UpdateUserRequest

	if err := c.ShouldBindUri(&req); err != nil {
		utils.Error(c, 400, "Invalid user ID")
		return
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.Error(c, 400, "Invalid request body")
		return
	}

	if err := services.UpdateUser(req); err != nil {
		utils.Error(c, 400, err.Error())
		return
	}

	utils.Success(c, 200, "User updated successfully")
}
