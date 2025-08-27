package menu

import (
	"github.com/MatheusABA/restaurant-project/server/controller/menu/dto"
	"github.com/MatheusABA/restaurant-project/server/services"
	"github.com/MatheusABA/restaurant-project/server/utils"
	"github.com/gin-gonic/gin"
)

func CreateMenuItem(c *gin.Context) {
	var req dto.CreateMenuItemRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.Error(c, 400, "Dados inválidos")
		return
	}
	item, err := services.CreateMenuItem(req)
	if err != nil {
		utils.Error(c, 500, err.Error())
		return
	}
	utils.Success(c, 201, item)
}
