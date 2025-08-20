package services

import (
	"errors"

	"github.com/MatheusABA/restaurant-project/server/controller/user/dto"
	"github.com/MatheusABA/restaurant-project/server/model"
	repositories "github.com/MatheusABA/restaurant-project/server/repositories/user"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(req dto.CreateUserRequest) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	user := model.User{
		Name:     req.Name,
		Email:    req.Email,
		Password: string(hashedPassword),
		Role:     req.Role,
		IsActive: true,
	}

	return repositories.CreateUser(&user)
}

func UpdateUser(req dto.UpdateUserRequest) error {
	user, err := repositories.FindUserById(req.ID)
	if err != nil || user == nil {
		return errors.New("user not found")
	}

	if req.Name != "" {
		user.Name = req.Name
	}
	if req.Email != "" {
		user.Email = req.Email
	}
	if req.Role != "" {
		user.Role = req.Role
	}
	if req.Password != "" {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			return err
		}
		user.Password = string(hashedPassword)
	}

	return repositories.UpdateUser(user)
}

func DeleteUser(id uint) error {
	user, err := repositories.FindUserById(id)
	if err != nil || user == nil {
		return errors.New("user not found")
	}
	user.IsActive = false // Soft delete
	return repositories.UpdateUser(user)
}

func FindUserById(id uint) (*model.User, error) {
	return repositories.FindUserById(id)
}

func FindUserByEmail(email string) (*model.User, error) {
	return repositories.FindUserByEmail(email)
}
