package invoicing

import (
	"github.com/MatheusABA/restaurant-project/server/services"
	"github.com/MatheusABA/restaurant-project/server/utils"
	"github.com/gin-gonic/gin"
)

func GetAllInvoices(c *gin.Context) {
	invoices, err := services.GetAllInvoices()
	if err != nil {
		utils.Error(c, 500, err.Error())
		return
	}
	utils.Success(c, 200, invoices)
}
