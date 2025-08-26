package user

import (
	"github.com/MatheusABA/restaurant-project/server/controller/user/dto"
	"github.com/MatheusABA/restaurant-project/server/services"
	"github.com/MatheusABA/restaurant-project/server/utils"
	"github.com/gin-gonic/gin"
)

func ActivateUser(c *gin.Context) {
	var req dto.ActivateUserRequest

	if err := c.ShouldBindUri(&req); err != nil {
		utils.Error(c, 400, "Invalid user ID")
		return
	}

	if err := services.ActivateUser(req.ID); err != nil {
		utils.Error(c, 400, err.Error())
		return
	}

	utils.Success(c, 200, "User activated successfully")
}
