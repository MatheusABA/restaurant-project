package menu

import (
	"github.com/MatheusABA/restaurant-project/server/services"
	"github.com/MatheusABA/restaurant-project/server/utils"
	"github.com/gin-gonic/gin"
)

func GetAllMenuItems(c *gin.Context) {
	items, err := services.GetAllMenuItems()
	if err != nil {
		utils.Error(c, 500, err.Error())
		return
	}
	utils.Success(c, 200, items)
}
