package repositories

import (
	"github.com/MatheusABA/restaurant-project/server/database"
	"github.com/MatheusABA/restaurant-project/server/model"
)

func GetAllInvoices() ([]model.Invoicing, error) {
	var invoices []model.Invoicing
	err := database.DB.Order("created_at DESC").Find(&invoices).Error
	return invoices, err
}
