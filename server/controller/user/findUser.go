package user

import (
	"github.com/MatheusABA/restaurant-project/server/controller/user/dto"
	"github.com/MatheusABA/restaurant-project/server/services/user"
	"github.com/MatheusABA/restaurant-project/server/utils"
	"github.com/gin-gonic/gin"
)

func FindUserById(c *gin.Context) {
	var userRequest dto.FindUserByIdRequest

	if err := c.ShouldBindUri(&userRequest); err != nil {
		utils.Error(c, 400, "Invalid user ID")
		return
	}

	user, err := user.FindUserById(userRequest.ID)
	if err != nil || user == nil {
		utils.Error(c, 404, "User not found")
		return
	}

	utils.Success(c, 200, user)

}

func FindUserByEmail(c *gin.Context) {
	var userRequest dto.FindUserByEmailRequest

	if err := c.ShouldBindUri(&userRequest); err != nil {
		utils.Error(c, 400, "Invalid email format")
		return
	}

	user, err := user.FindUserByEmail(userRequest.Email)
	if err != nil || user == nil {
		utils.Error(c, 404, "User not found")
		return
	}

	utils.Success(c, 200, user)
}

func FindAllUsers(c *gin.Context) {
	users, err := user.FindAllUsers()
	if err != nil {
		utils.Error(c, 500, "Error while searching users")
		return
	}
	utils.Success(c, 200, users)
}

func FindArchivedUsers(c *gin.Context) {
	users, err := user.FindArchivedUsers()
	if err != nil {
		utils.Error(c, 500, "Error while searching archived users")
		return
	}
	utils.Success(c, 200, users)
}
