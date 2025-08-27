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
