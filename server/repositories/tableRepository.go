package repositories

import (
	"github.com/MatheusABA/restaurant-project/server/database"
	"github.com/MatheusABA/restaurant-project/server/model"
)

func GetAllTables() ([]model.Table, error) {
	var tables []model.Table
	err := database.DB.Order("number ASC").Find(&tables).Error
	return tables, err
}
