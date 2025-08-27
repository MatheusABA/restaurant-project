package dto

type CreateMenuItemRequest struct {
	Name     string `json:"name" binding:"required"`
	Price    int    `json:"price" binding:"required"`
	Category string `json:"category" binding:"required"`
	IsActive bool   `json:"is_active"`
}
