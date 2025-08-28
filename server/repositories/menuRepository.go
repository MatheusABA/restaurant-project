package repositories

import (
	"github.com/MatheusABA/restaurant-project/server/database"
	"github.com/MatheusABA/restaurant-project/server/model"
)

func CreateMenuItem(item *model.MenuItem) (*model.MenuItem, error) {
	if err := database.DB.Create(item).Error; err != nil {
		return nil, err
	}
	return item, nil
}

func GetAllMenuItems() ([]model.MenuItem, error) {
	var items []model.MenuItem
	err := database.DB.Order("name ASC").Find(&items).Error
	return items, err
}
