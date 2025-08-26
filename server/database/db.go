package database

import (
	"fmt"
	"log"

	"github.com/MatheusABA/restaurant-project/server/config"
	"github.com/MatheusABA/restaurant-project/server/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase(config *config.Config) {
	dbConnection := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		config.DBHost, config.DBPort, config.DBUser, config.DBPassword, config.DBName,
	)

	// Do connection to the database
	database, err := gorm.Open(postgres.Open(dbConnection), &gorm.Config{})
	if err != nil {
		log.Fatalf("Could not connect to the database: %v", err)
	}
	DB = database

	if err := DB.AutoMigrate(
		&model.User{},
		&model.Order{},
		&model.OrderItem{},
		&model.Table{},
		&model.Invoicing{},
	); err != nil {
		log.Fatalf("AutoMigrate failed: %v", err)
	}
}
