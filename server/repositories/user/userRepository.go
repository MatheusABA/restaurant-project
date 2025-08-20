package repositories

import (
	"github.com/MatheusABA/restaurant-project/server/database"
	"github.com/MatheusABA/restaurant-project/server/model"
)

func CreateUser(user *model.User) error {
	return database.DB.Create(user).Error
}

func FindUserById(id uint) (*model.User, error) {
	var user model.User
	if err := database.DB.Where("id = ? AND is_active = ?", id, true).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func FindUserByEmail(email string) (*model.User, error) {
	var user model.User
	if err := database.DB.Where("email = ? AND is_active = ?", email, true).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func UpdateUser(user *model.User) error {
	return database.DB.Save(user).Error
}

func FindAllUsers() ([]model.User, error) {
	var users []model.User
	err := database.DB.Where("is_active = ?", true).Find(&users).Error
	return users, err
}
