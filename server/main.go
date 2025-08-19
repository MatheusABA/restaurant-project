package main

import (
	"github.com/MatheusABA/restaurant-project/server/config"
	"github.com/MatheusABA/restaurant-project/server/controller/routes"
	"github.com/MatheusABA/restaurant-project/server/database"
	"github.com/MatheusABA/restaurant-project/server/utils"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.LoadConfig()
	database.ConnectDatabase(cfg)
	utils.InfoLogger.Println("Database connected!")

	router := gin.Default()
	routes.InitRoutes(&router.RouterGroup)

	if err := router.Run(":8088"); err != nil {
		utils.ErrorLogger.Fatalf("Failed to start server: %v", err)
	}
}
