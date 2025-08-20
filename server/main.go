package main

import (
	"github.com/MatheusABA/restaurant-project/server/config"
	"github.com/MatheusABA/restaurant-project/server/database"
	"github.com/MatheusABA/restaurant-project/server/routes"
	"github.com/MatheusABA/restaurant-project/server/utils"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.LoadConfig()
	database.ConnectDatabase(cfg)
	utils.InitLogger()
	utils.Logger.Info("Logger initialized")
	utils.Logger.Info("Database connected")

	sqlDB, err := database.DB.DB()
	if err == nil {
		defer sqlDB.Close()
	}

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	routes.InitRoutes(&router.RouterGroup)

	if err := router.Run(":8088"); err != nil {
		utils.Logger.Error("Failed to start server: ", err)
	}
}
