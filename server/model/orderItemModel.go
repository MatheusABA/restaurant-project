package model

type OrderItem struct {
	ID         uint   `gorm:"primaryKey" json:"id"`
	OrderID    uint   `json:"order_id"`
	MenuItemID uint   `json:"menu_item_id"`
	Name       string `json:"name"`
	Price      int    `json:"price"`
	Quantity   int    `json:"quantity"`
}
