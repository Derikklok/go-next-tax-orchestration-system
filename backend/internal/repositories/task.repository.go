package repositories

import (
	"github.com/Derikklok/task-management/internal/models"
	"gorm.io/gorm"
)

type TaskRepository interface {
	GetAllTasks() ([]models.Task, error)
	GetTaskByID(id uint) (*models.Task, error)
	CreateTask(task *models.Task) error
	UpdateTask(id uint, task *models.Task) error
	DeleteTask(id uint) error
}

type taskRepository struct {
	db *gorm.DB
}

// NewTaskRepository creates a new instance of TaskRepository
func NewTaskRepository(db *gorm.DB) TaskRepository {
	return &taskRepository{db}
}

// GetAllTasks retrieves all tasks from the database
func (r *taskRepository) GetAllTasks() ([]models.Task, error) {
	var tasks []models.Task
	if err := r.db.Find(&tasks).Error; err != nil {
		return nil, err
	}
	return tasks, nil
}

// GetTaskByID retrieves a single task by ID
func (r *taskRepository) GetTaskByID(id uint) (*models.Task, error) {
	var task models.Task
	if err := r.db.First(&task, id).Error; err != nil {
		return nil, err
	}
	return &task, nil
}

// CreateTask inserts a new task into the database
func (r *taskRepository) CreateTask(task *models.Task) error {
	if err := r.db.Create(task).Error; err != nil {
		return err
	}
	return nil
}

// UpdateTask updates an existing task by ID
func (r *taskRepository) UpdateTask(id uint, task *models.Task) error {
	if err := r.db.Model(&models.Task{}).Where("id = ?", id).Updates(task).Error; err != nil {
		return err
	}
	return nil
}

// DeleteTask removes a task from the database by ID
func (r *taskRepository) DeleteTask(id uint) error {
	if err := r.db.Delete(&models.Task{}, id).Error; err != nil {
		return err
	}
	return nil
}
