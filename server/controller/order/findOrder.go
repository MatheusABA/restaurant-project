package order

import (
	"time"

	"github.com/MatheusABA/restaurant-project/server/controller/order/dto"
	"github.com/MatheusABA/restaurant-project/server/services/order"
	"github.com/MatheusABA/restaurant-project/server/utils"
	"github.com/gin-gonic/gin"
)

func GetAllOrders(c *gin.Context) {
	orders, err := order.GetAllOrders()
	if err != nil {
		utils.Error(c, 500, err.Error())
		return
	}

	var resp []dto.OrderResponse
	for _, o := range orders {
		r := dto.OrderResponse{
			ID:     o.ID,
			UserID: o.UserID,
			User: dto.UserResponse{
				ID:    o.User.ID,
				Name:  o.User.Name,
				Email: o.User.Email,
				Role:  o.User.Role,
			},
			Status:    o.Status,
			CreatedAt: o.CreatedAt.Format(time.RFC3339),
			UpdatedAt: o.UpdatedAt.Format(time.RFC3339),
		}
		for _, item := range o.Items {
			r.Items = append(r.Items, dto.OrderItemResponse{
				ID:       item.ID,
				OrderID:  item.OrderID,
				Name:     item.Name,
				Price:    item.Price,
				Quantity: item.Quantity,
			})
		}
		resp = append(resp, r)
	}

	utils.Success(c, 200, resp)
}

func GetOrderById(c *gin.Context) {
	var req dto.GetOrderByIdRequest
	if err := c.ShouldBindUri(&req); err != nil {
		utils.Error(c, 400, "ID invalido")
		return
	}
	orderModel, err := order.GetOrderById(req.ID)
	if err != nil {
		utils.Error(c, 404, "Comanda não encontrada")
		return
	}

	resp := dto.OrderResponse{
		ID:     orderModel.ID,
		UserID: orderModel.UserID,
		User: dto.UserResponse{
			ID:    orderModel.User.ID,
			Name:  orderModel.User.Name,
			Email: orderModel.User.Email,
			Role:  orderModel.User.Role,
		},
		Status:    orderModel.Status,
		CreatedAt: orderModel.CreatedAt.Format(time.RFC3339),
		UpdatedAt: orderModel.UpdatedAt.Format(time.RFC3339),
	}
	for _, item := range orderModel.Items {
		resp.Items = append(resp.Items, dto.OrderItemResponse{
			ID:       item.ID,
			OrderID:  item.OrderID,
			Name:     item.Name,
			Price:    item.Price,
			Quantity: item.Quantity,
		})
	}

	utils.Success(c, 200, resp)
}
