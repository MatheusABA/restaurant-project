package order

import (
	"time"

	"github.com/MatheusABA/restaurant-project/server/controller/order/dto"
	"github.com/MatheusABA/restaurant-project/server/database"
	"github.com/MatheusABA/restaurant-project/server/services/order"
	"github.com/MatheusABA/restaurant-project/server/utils"
	"github.com/gin-gonic/gin"
)

func CreateOrder(c *gin.Context) {
	var orderRequest dto.CreateOrderRequest
	if err := c.ShouldBindJSON(&orderRequest); err != nil {
		utils.Error(c, 400, "Invalid request body")
		return
	}

	userID, exists := c.Get("user_id")
	if !exists {
		utils.Error(c, 401, "Unauthorized: User not found")
	}

	var userIDUint uint
	switch v := userID.(type) {
	case float64:
		userIDUint = uint(v)
	case int:
		userIDUint = uint(v)
	case uint:
		userIDUint = v
	default:
		utils.Error(c, 500, "Invalid user_id type")
		return
	}

	orderRequest.UserID = userIDUint
	orderModel, err := order.CreateOrder(orderRequest)
	if err != nil {
		utils.Error(c, 500, err.Error())
		return
	}

	database.DB.Preload("User").Preload("Items").First(&orderModel, orderModel.ID)

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

	utils.Success(c, 201, resp)
}
