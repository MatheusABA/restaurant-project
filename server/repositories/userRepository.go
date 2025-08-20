package repositories

import (
	"github.com/MatheusABA/restaurant-project/server/database"
	"github.com/MatheusABA/restaurant-project/server/model"
)

func CreateUser(user *model.User) error {
	return database.DB.Create(user).Error
}
