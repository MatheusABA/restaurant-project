package table

import (
	"github.com/MatheusABA/restaurant-project/server/database"
	"github.com/MatheusABA/restaurant-project/server/model"
	"github.com/MatheusABA/restaurant-project/server/utils"
	"github.com/gin-gonic/gin"
)

func GetAllTables(c *gin.Context) {
	var tables []model.Table
	if err := database.DB.Find(&tables).Error; err != nil {
		utils.Error(c, 500, err.Error())
		return
	}
	utils.Success(c, 200, tables)
}
