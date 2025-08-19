package user

import (
	"github.com/MatheusABA/restaurant-project/server/utils"
	"github.com/gin-gonic/gin"
)

func FindUserById(c *gin.Context) {
	utils.Error(c, 404, "User not found")

}

func FindUserByEmail(c *gin.Context) {
	utils.Error(c, 404, "User not found")
}
