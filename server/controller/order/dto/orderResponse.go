package dto

type UserResponse struct {
	ID    uint   `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Role  string `json:"role"`
}

type OrderItemResponse struct {
	ID       uint   `json:"id"`
	OrderID  uint   `json:"order_id"`
	Name     string `json:"name"`
	Price    int    `json:"price"`
	Quantity int    `json:"quantity"`
}

type OrderResponse struct {
	ID        uint                `json:"id"`
	UserID    uint                `json:"user_id"`
	User      UserResponse        `json:"user"`
	Status    string              `json:"status"`
	CreatedAt string              `json:"created_at"`
	UpdatedAt string              `json:"updated_at"`
	Items     []OrderItemResponse `json:"items"`
}
