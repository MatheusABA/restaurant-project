package services

import (
	"github.com/MatheusABA/restaurant-project/server/model"
	"github.com/MatheusABA/restaurant-project/server/repositories"
)

func GetAllInvoices() ([]model.Invoicing, error) {
	return repositories.GetAllInvoices()
}
