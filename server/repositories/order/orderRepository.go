package order

import (
	"github.com/MatheusABA/restaurant-project/server/database"
	"github.com/MatheusABA/restaurant-project/server/model"
)

func CreateOrder(order *model.Order) (*model.Order, error) {
	if err := database.DB.Create(order).Error; err != nil {
		return nil, err
	}
	return order, nil
}

func GetAllOrders() ([]model.Order, error) {
	var orders []model.Order
	err := database.DB.
		Preload("User").
		Preload("Items").
		Where("status = ?", "open").
		Find(&orders).Error
	return orders, err
}

func GetOrderById(id uint) (*model.Order, error) {
	var order model.Order
	err := database.DB.
		Preload("User").
		Preload("Items").
		Where("id = ?", id).
		First(&order).Error
	if err != nil {
		return nil, err
	}
	return &order, nil
}
