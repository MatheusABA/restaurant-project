package model

type Table struct {
	ID     uint   `gorm:"primaryKey" json:"id"`
	Number int    `json:"number"` // Número da mesa (ex: 1, 2, 3...)
	Status string `json:"status"` // Status da mesa (ex: "disponível", "ocupada", "reservada")
}
