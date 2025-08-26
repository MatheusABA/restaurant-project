package order

import (
	"github.com/MatheusABA/restaurant-project/server/controller/order/dto"
	"github.com/MatheusABA/restaurant-project/server/services"
	"github.com/MatheusABA/restaurant-project/server/utils"
	"github.com/gin-gonic/gin"
)

func DeleteOrder(c *gin.Context) {
	var req dto.DeleteOrderRequest
	if err := c.ShouldBindUri(&req); err != nil {
		utils.Error(c, 400, "ID inválido")
		return
	}
	if err := services.DeleteOrder(req); err != nil {
		utils.Error(c, 500, err.Error())
		return
	}
	utils.Success(c, 200, "Comanda descartada com sucesso")
}
