package dto

type CreateOrderRequest struct {
	UserID  uint               `json:"user_id"`
	TableID uint               `json:"table_id" binding:"required"`
	Items   []OrderItemRequest `json:"items"`
}

type OrderItemRequest struct {
	MenuItemID uint `json:"menu_item_id" binding:"required"`
	Quantity   int  `json:"quantity" binding:"required"`
}

type CloseOrderRequest struct {
	ID uint `uri:"id" binding:"required"`
}

type GetOrderByIdRequest struct {
	ID uint `uri:"id" binding:"required"`
}

type AddOrderItemRequest struct {
	ID       uint   `uri:"id" binding:"required"`
	Name     string `json:"name" `
	Price    int    `json:"price" `
	Quantity int    `json:"quantity"`
}

type DeleteOrderRequest struct {
	ID uint `uri:"id" binding:"required"`
}
