package customer

import "gorm.io/gorm"

type Repository interface {
	Create(customer *Customer) error
	FindAll() ([]Customer, error)
}

type repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) Repository {
	return &repository{db}
}

func (r *repository) Create(customer *Customer) error {
	return r.db.Create(customer).Error
}

func (r *repository) FindAll() ([]Customer, error) {
	var customers []Customer
	err := r.db.Find(&customers).Error
	return customers, err
}
