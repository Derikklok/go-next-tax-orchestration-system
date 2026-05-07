package customer

import "gorm.io/gorm"

type Customer struct {
	gorm.Model
	Name    string `json:"name"`
	Email   string `json:"email" gorm:"unique"`
	Phone   string `json:"phone"`
	Address string `json:"address"`
}
