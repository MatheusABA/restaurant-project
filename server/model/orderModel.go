package model

import (
	"time"
)

type Order struct {
	ID          uint        `gorm:"primaryKey" json:"id"`
	TableID     uint        `json:"table_id"` // Mesa associada
	Table       Table       `gorm:"foreignKey:TableID"`
	UserID      uint        `json:"user_id"` // Funcionário responsável
	User        User        `gorm:"foreignKey:UserID"`
	Status      string      `json:"status"` // Status da ordem ("open", "completed")
	CreatedAt   time.Time   `json:"created_at"`
	UpdatedAt   time.Time   `json:"updated_at"`
	CompletedAt *time.Time  `json:"completed_at,omitempty"`
	Items       []OrderItem `gorm:"foreignKey:OrderID" json:"items"`
}
