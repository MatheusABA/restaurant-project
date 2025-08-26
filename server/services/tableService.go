package services

import (
	"github.com/MatheusABA/restaurant-project/server/model"
	"github.com/MatheusABA/restaurant-project/server/repositories"
)

func GetAllTables() ([]model.Table, error) {
	return repositories.GetAllTables()
}
