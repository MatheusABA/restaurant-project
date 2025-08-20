package main

import (
	"github.com/MatheusABA/restaurant-project/server/config"
	"github.com/MatheusABA/restaurant-project/server/database"
	"github.com/MatheusABA/restaurant-project/server/routes"
	"github.com/MatheusABA/restaurant-project/server/utils"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.LoadConfig()
	database.ConnectDatabase(cfg)
	utils.InitLogger()
	utils.LogInfo("Logger initialized")
	utils.LogInfo("Database connected")

	sqlDB, err := database.DB.DB()
	if err == nil {
		defer sqlDB.Close()
	}

	router := gin.Default()
	routes.InitRoutes(&router.RouterGroup)

	if err := router.Run(":8088"); err != nil {
		utils.LogError("Failed to start server: %v", err)
	}
}
