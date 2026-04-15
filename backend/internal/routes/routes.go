package routes

import (
	"github.com/Derikklok/task-management/internal/handlers"
	"github.com/Derikklok/task-management/internal/repositories"
	"github.com/Derikklok/task-management/internal/services"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

// SetupRoutes initializes all routes for the application
func SetupRoutes(router *gin.Engine, db *gorm.DB) {
	router.Use(corsMiddleware())

	// Initialize repository, service, and handler
	taskRepo := repositories.NewTaskRepository(db)
	taskService := services.NewTaskService(taskRepo)
	taskHandler := handlers.NewTaskHandler(taskService)

	// API Routes
	api := router.Group("/api")
	{
		tasks := api.Group("/tasks")
		{
			// GET all tasks
			tasks.GET("", taskHandler.GetAllTasks)
			// POST create a new task
			tasks.POST("", taskHandler.CreateTask)
			// GET a single task by ID
			tasks.GET("/:id", taskHandler.GetTaskByID)
			// PUT update a task
			tasks.PUT("/:id", taskHandler.UpdateTask)
			// DELETE a task
			tasks.DELETE("/:id", taskHandler.DeleteTask)
		}
	}

	// Health check route
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
		})
	})
}
