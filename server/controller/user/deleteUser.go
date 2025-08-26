package user

import (
	"github.com/MatheusABA/restaurant-project/server/controller/user/dto"
	"github.com/MatheusABA/restaurant-project/server/services"
	"github.com/MatheusABA/restaurant-project/server/utils"
	"github.com/gin-gonic/gin"
)

func DeleteUser(c *gin.Context) {
	var req dto.DeleteUserRequest

	if err := c.ShouldBindUri(&req); err != nil {
		utils.Error(c, 400, "Invalid user ID")
		return
	}

	if err := services.DeleteUser(req.ID); err != nil {
		utils.Error(c, 400, err.Error())
		return
	}

	utils.Success(c, 200, "User deleted successfully")
}
