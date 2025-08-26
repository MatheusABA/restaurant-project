package user

import (
	"errors"

	"github.com/MatheusABA/restaurant-project/server/controller/user/dto"
	"github.com/MatheusABA/restaurant-project/server/model"
	"github.com/MatheusABA/restaurant-project/server/repositories/user"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(req dto.CreateUserRequest) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	userRequest := model.User{
		Name:     req.Name,
		Email:    req.Email,
		Password: string(hashedPassword),
		Role:     req.Role,
		IsActive: true,
	}

	return user.CreateUser(&userRequest)
}

func UpdateUser(req dto.UpdateUserRequest) error {
	userRequest, err := user.FindUserById(req.ID)
	if err != nil || userRequest == nil {
		return errors.New("user not found")
	}

	if req.Name != "" {
		userRequest.Name = req.Name
	}
	if req.Email != "" {
		userRequest.Email = req.Email
	}
	if req.Role != "" {
		userRequest.Role = req.Role
	}
	if req.Password != "" {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			return err
		}
		userRequest.Password = string(hashedPassword)
	}

	return user.UpdateUser(userRequest)
}

// Soft delete user
func DeleteUser(id uint) error {
	userRequest, err := user.FindUserById(id)
	if err != nil || userRequest == nil {
		return errors.New("user not found")
	}

	return user.SoftDeleteUser(userRequest)
}

// Reactivate user
func ActivateUser(id uint) error {
	return user.ActivateUserById(id)
}

func FindUserById(id uint) (*model.User, error) {
	return user.FindUserById(id)
}

func FindUserByEmail(email string) (*model.User, error) {
	return user.FindUserByEmail(email)
}

func FindAllUsers() ([]model.User, error) {
	return user.FindAllUsers()
}

func FindArchivedUsers() ([]model.User, error) {
	return user.FindArchivedUsers()
}
