package services

import (
	"errors"
	"os"
	"time"

	"github.com/MatheusABA/restaurant-project/server/controller/auth/dto"
	repositories "github.com/MatheusABA/restaurant-project/server/repositories/user"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func AuthenticateUser(req dto.AuthRequest) (string, error) {
	user, err := repositories.FindUserByEmail(req.Email)
	if err != nil || user == nil || !user.IsActive {
		return "", errors.New("invalid credentials")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		return "", errors.New("invalid credentials")
	}

	// Generate JWT
	claims := jwt.MapClaims{
		"user_id": user.ID,
		"role":    user.Role,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	secret := os.Getenv("JWT_SECRET")
	signedToken, err := token.SignedString([]byte(secret))
	if err != nil {
		return "", errors.New("failed to generate token")
	}

	return signedToken, nil
}
