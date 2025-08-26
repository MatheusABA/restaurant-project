package repositories

import (
	"time"

	"github.com/MatheusABA/restaurant-project/server/database"
	"github.com/MatheusABA/restaurant-project/server/model"
	"gorm.io/gorm"
)

func CreateUser(user *model.User) error {
	return database.DB.Create(user).Error
}

func FindAllUsers() ([]model.User, error) {
	var users []model.User
	err := database.DB.Where("is_active = ?", true).Find(&users).Error
	return users, err
}

func FindUserById(id uint) (*model.User, error) {
	var user model.User
	if err := database.DB.Where("id = ?", id).First(&user).Error; err != nil {
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

func FindArchivedUsers() ([]model.User, error) {
	var users []model.User
	err := database.DB.Unscoped().Where("is_active = ?", false).Find(&users).Error
	return users, err
}

func UpdateUser(user *model.User) error {
	return database.DB.Save(user).Error
}

func SoftDeleteUser(user *model.User) error {
	now := time.Now()
	if err := database.DB.Model(user).Updates(map[string]any{
		"is_active":  false,
		"deleted_at": now,
	}).Error; err != nil {
		return err
	}
	return nil
}

func ActivateUserById(id uint) error {
	return database.DB.Model(&model.User{}).
		Unscoped(). // GORM normally ignores soft-deleted records, so we use Unscoped to include them
		Where("id = ?", id).
		Updates(map[string]any{
			"is_active":  true,
			"deleted_at": gorm.Expr("NULL"),
		}).Error
}
