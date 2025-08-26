package model

import "time"

type Invoicing struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	OrderID   uint      `json:"order_id"`
	TableID   uint      `json:"table_id"`
	Total     int       `json:"total"` // em centavos
	CreatedAt time.Time `json:"created_at"`
}
