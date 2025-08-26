package order

import (
	"github.com/MatheusABA/restaurant-project/server/controller/order/dto"
	"github.com/MatheusABA/restaurant-project/server/model"
	"github.com/MatheusABA/restaurant-project/server/repositories/order"
)

func CreateOrder(req dto.CreateOrderRequest) (*model.Order, error) {
	orderModel := model.Order{
		UserID: req.UserID,
		Status: "open",
	}

	for _, item := range req.Items {
		orderModel.Items = append(orderModel.Items, model.OrderItem{
			Name:     item.Name,
			Price:    item.Price,
			Quantity: item.Quantity,
		})
	}
	return order.CreateOrder(&orderModel)
}

func GetAllOrders() ([]model.Order, error) {
	return order.GetAllOrders()
}

func GetOrderById(id uint) (*model.Order, error) {
	return order.GetOrderById(id)
}
