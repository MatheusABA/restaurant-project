package services

import (
	"github.com/MatheusABA/restaurant-project/server/controller/user/dto"
	"github.com/MatheusABA/restaurant-project/server/model"
	"github.com/MatheusABA/restaurant-project/server/repositories"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(req dto.UserRequest) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	user := model.User{
		Name:     req.Name,
		Email:    req.Email,
		Password: string(hashedPassword),
	}

	return repositories.CreateUser(&user)
}
