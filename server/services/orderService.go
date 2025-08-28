package services

import (
	"github.com/MatheusABA/restaurant-project/server/controller/order/dto"
	"github.com/MatheusABA/restaurant-project/server/model"
	"github.com/MatheusABA/restaurant-project/server/repositories"
)

func CreateOrder(req dto.CreateOrderRequest) (*model.Order, error) {
	orderModel := model.Order{
		UserID:  req.UserID,
		TableID: req.TableID,
		Status:  "open",
	}

	for _, item := range req.Items {
		// Busca o MenuItem pelo ID
		menuItem, err := repositories.GetMenuItemByID(item.MenuItemID)
		if err != nil {
			return nil, err
		}
		orderModel.Items = append(orderModel.Items, model.OrderItem{
			MenuItemID: menuItem.ID,
			Name:       menuItem.Name,
			Price:      menuItem.Price,
			Quantity:   item.Quantity,
		})
	}
	return repositories.CreateOrder(&orderModel)
}

func GetAllOrders() ([]model.Order, error) {
	return repositories.GetAllOrders()
}

func GetOrderById(id uint) (*model.Order, error) {
	return repositories.GetOrderById(id)
}

func UpdateOrderStatus(req dto.CloseOrderRequest) error {
	return repositories.UpdateOrderStatus(req.ID)
}

func AddOrderItem(req dto.AddOrderItemRequest) error {
	menuItem, err := repositories.GetMenuItemByID(req.MenuItemID)
	if err != nil {
		return err
	}

	orderItem := model.OrderItem{
		OrderID:    req.ID,
		MenuItemID: menuItem.ID,
		Name:       menuItem.Name,
		Price:      menuItem.Price,
		Quantity:   req.Quantity,
	}
	return repositories.AddOrderItem(orderItem)
}

func DeleteOrder(req dto.DeleteOrderRequest) error {
	return repositories.DeleteOrder(req.ID)
}
