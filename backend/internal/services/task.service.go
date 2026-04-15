package services

import (
	"github.com/Derikklok/task-management/internal/dto"
	"github.com/Derikklok/task-management/internal/models"
	"github.com/Derikklok/task-management/internal/repositories"
)

type TaskService interface {
	GetAllTasks() ([]dto.TaskResponse, error)
	GetTaskByID(id uint) (*dto.TaskResponse, error)
	CreateTask(req *dto.CreateTaskRequest) (*dto.TaskResponse, error)
	UpdateTask(id uint, req *dto.UpdateTaskRequest) (*dto.TaskResponse, error)
	DeleteTask(id uint) error
}

type taskService struct {
	repo repositories.TaskRepository
}

// NewTaskService creates a new instance of TaskService
func NewTaskService(repo repositories.TaskRepository) TaskService {
	return &taskService{repo}
}

// GetAllTasks retrieves all tasks and converts them to DTOs
func (s *taskService) GetAllTasks() ([]dto.TaskResponse, error) {
	tasks, err := s.repo.GetAllTasks()
	if err != nil {
		return nil, err
	}

	var responses []dto.TaskResponse
	for _, task := range tasks {
		responses = append(responses, taskToDTO(&task))
	}
	return responses, nil
}

// GetTaskByID retrieves a single task by ID
func (s *taskService) GetTaskByID(id uint) (*dto.TaskResponse, error) {
	task, err := s.repo.GetTaskByID(id)
	if err != nil {
		return nil, err
	}

	response := taskToDTO(task)
	return &response, nil
}

// CreateTask creates a new task from the request
func (s *taskService) CreateTask(req *dto.CreateTaskRequest) (*dto.TaskResponse, error) {
	task := &models.Task{
		Title:       req.Title,
		Description: req.Description,
		Status:      "pending",
	}

	if err := s.repo.CreateTask(task); err != nil {
		return nil, err
	}

	response := taskToDTO(task)
	return &response, nil
}

// UpdateTask updates an existing task
func (s *taskService) UpdateTask(id uint, req *dto.UpdateTaskRequest) (*dto.TaskResponse, error) {
	task := &models.Task{
		Title:       req.Title,
		Description: req.Description,
		Status:      req.Status,
	}

	if err := s.repo.UpdateTask(id, task); err != nil {
		return nil, err
	}

	updatedTask, err := s.repo.GetTaskByID(id)
	if err != nil {
		return nil, err
	}

	response := taskToDTO(updatedTask)
	return &response, nil
}

// DeleteTask deletes a task by ID
func (s *taskService) DeleteTask(id uint) error {
	return s.repo.DeleteTask(id)
}

// taskToDTO converts a Task model to TaskResponse DTO
func taskToDTO(task *models.Task) dto.TaskResponse {
	return dto.TaskResponse{
		ID:          task.ID,
		Title:       task.Title,
		Description: task.Description,
		Status:      task.Status,
	}
}
