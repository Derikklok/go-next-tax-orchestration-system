package main

import (
	"fmt"
	"log"

	"github.com/Derikklok/task-management/internal/config"
	"github.com/Derikklok/task-management/internal/database"
	"github.com/Derikklok/task-management/internal/models"
	"github.com/Derikklok/task-management/internal/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	// Load configurations
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	// Connect to database
	db, err := database.ConnectDB(cfg)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Run migrations
	if err := db.AutoMigrate(&models.Task{}); err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}

	fmt.Println("✓ Connected to database successfully")

	// Setup Gin router
	router := gin.Default()

	// Setup all routes
	routes.SetupRoutes(router, db)

	// Start server
	serverAddr := fmt.Sprintf(":%s", cfg.AppPort)
	fmt.Printf("✓ Server starting on %s\n", serverAddr)
	if err := router.Run(serverAddr); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
