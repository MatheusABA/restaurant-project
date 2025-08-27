package repositories

import (
	"time"

	"github.com/MatheusABA/restaurant-project/server/database"
	"github.com/MatheusABA/restaurant-project/server/model"
)

func CreateOrder(order *model.Order) (*model.Order, error) {
	if err := database.DB.Create(order).Error; err != nil {
		return nil, err
	}
	database.DB.Model(&model.Table{}).
		Where("id = ?", order.TableID).
		Update("status", "ocupada")
	return order, nil
}

func GetAllOrders() ([]model.Order, error) {
	var orders []model.Order
	err := database.DB.
		Preload("User").
		Preload("Items").
		Preload("Table").
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

func UpdateOrderStatus(id uint) error {
	updates := map[string]any{
		"status":       "completed",
		"completed_at": time.Now(),
	}
	if err := database.DB.Model(&model.Order{}).
		Where("id = ?", id).
		Updates(updates).Error; err != nil {
		return err
	}
	// Busca a comanda para pegar a mesa e os itens
	var order model.Order
	if err := database.DB.Preload("Items").Where("id = ?", id).First(&order).Error; err != nil {
		return err
	}
	// Libera a mesa
	if err := database.DB.Model(&model.Table{}).
		Where("id = ?", order.TableID).
		Update("status", "disponivel").Error; err != nil {
		return err
	}
	// Calcula o total dos itens
	total := 0
	for _, item := range order.Items {
		total += item.Price * item.Quantity
	}
	// Cria registro financeiro
	finance := model.Invoicing{
		OrderID:   order.ID,
		TableID:   order.TableID,
		Total:     total,
		CreatedAt: time.Now(),
	}
	if err := database.DB.Create(&finance).Error; err != nil {
		return err
	}
	return nil
}

func AddOrderItem(item model.OrderItem) error {
	return database.DB.Create(&item).Error
}

func DeleteOrder(id uint) error {
	updates := map[string]any{
		"status": "cancelled",
	}
	if err := database.DB.Model(&model.Order{}).
		Where("id = ?", id).
		Updates(updates).Error; err != nil {
		return err
	}
	// Libera a mesa
	var order model.Order
	if err := database.DB.Where("id = ?", id).First(&order).Error; err != nil {
		return err
	}
	return database.DB.Model(&model.Table{}).
		Where("id = ?", order.TableID).
		Update("status", "disponivel").Error
}

func GetMenuItemByID(id uint) (*model.MenuItem, error) {
	var item model.MenuItem
	err := database.DB.First(&item, id).Error
	if err != nil {
		return nil, err
	}
	return &item, nil
}
