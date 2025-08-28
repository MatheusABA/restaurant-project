package services

import (
	"github.com/MatheusABA/restaurant-project/server/controller/menu/dto"
	"github.com/MatheusABA/restaurant-project/server/model"
	"github.com/MatheusABA/restaurant-project/server/repositories"
)

func CreateMenuItem(req dto.CreateMenuItemRequest) (*model.MenuItem, error) {
	item := model.MenuItem{
		Name:     req.Name,
		Price:    req.Price,
		Category: req.Category,
		IsActive: req.IsActive,
	}
	return repositories.CreateMenuItem(&item)
}

func GetAllMenuItems() ([]model.MenuItem, error) {
	return repositories.GetAllMenuItems()
}
