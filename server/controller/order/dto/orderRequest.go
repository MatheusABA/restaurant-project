package dto

type CreateOrderRequest struct {
	UserID uint               `json:"user_id"`
	Items  []OrderItemRequest `json:"items"`
}

type OrderItemRequest struct {
	Name     string `json:"name" binding:"required"`
	Price    int    `json:"price" binding:"required"`
	Quantity int    `json:"quantity" binding:"required"`
}

type CloseOrderRequest struct {
	ID uint `uri:"id" binding:"required"`
}

type GetOrderByIdRequest struct {
	ID uint `uri:"id" binding:"required"`
}
