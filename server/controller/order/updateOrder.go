package order

import (
	"github.com/MatheusABA/restaurant-project/server/controller/order/dto"
	"github.com/MatheusABA/restaurant-project/server/services"
	"github.com/MatheusABA/restaurant-project/server/utils"
	"github.com/gin-gonic/gin"
)

func UpdateOrderStatus(c *gin.Context) {

	var req dto.CloseOrderRequest

	if err := c.ShouldBindUri(&req); err != nil {
		utils.Logger.Warn("Invalid ID")
		utils.Error(c, 400, "Invalid ID")
		return
	}
	if err := services.UpdateOrderStatus(req); err != nil {
		utils.Error(c, 500, err.Error())
		return
	}
	utils.Success(c, 200, "Order updated succesfully")
}
