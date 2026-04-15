# Task Management System - Backend

A RESTful API for task management built with Go, Gin, and MySQL using GORM as the ORM.

## Features

- ✅ Create, Read, Update, and Delete (CRUD) tasks
- ✅ Task status tracking (pending, in-progress, completed)
- ✅ RESTful API with proper HTTP methods and status codes
- ✅ Database persistence with MySQL
- ✅ Clean architecture with repositories, services, and handlers
- ✅ Environment-based configuration

## Prerequisites

- Go 1.25.4 or higher
- MySQL 5.7 or higher
- Optional: Docker and Docker Compose for containerized setup

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Derikklok/task-management.git
cd task-management/backend
```

### 2. Install Dependencies
```bash
go mod download
```

### 3. Configure Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
APP_PORT=8080

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=task_manager
```

### 4. Create Database

If using MySQL directly, create the database:
```sql
CREATE DATABASE task_manager;
```

## Running the Application

### Option 1: Run Directly with Go

```bash
go run cmd/server/main.go
```

### Option 2: Build and Run Binary

```bash
go build -o build/server cmd/server/main.go
./build/server
```

### Option 3: Using Docker Compose

```bash
docker-compose up
```

The server will start on `http://localhost:8080`

## API Endpoints

### Base URL
```
http://localhost:8080/api
```

### Task Endpoints

#### 1. Get All Tasks
```http
GET /tasks
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Complete project",
      "description": "Finish the task management system",
      "status": "in-progress"
    }
  ],
  "total": 1
}
```

#### 2. Get Task by ID
```http
GET /tasks/:id
```

**Response (200 OK):**
```json
{
  "data": {
    "id": 1,
    "title": "Complete project",
    "description": "Finish the task management system",
    "status": "in-progress"
  }
}
```

#### 3. Create a New Task
```http
POST /tasks
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task management system"
}
```

**Response (201 Created):**
```json
{
  "data": {
    "id": 1,
    "title": "Complete project",
    "description": "Finish the task management system",
    "status": "pending"
  },
  "message": "Task created successfully"
}
```

#### 4. Update a Task
```http
PUT /tasks/:id
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed"
}
```

**Response (200 OK):**
```json
{
  "data": {
    "id": 1,
    "title": "Updated title",
    "description": "Updated description",
    "status": "completed"
  },
  "message": "Task updated successfully"
}
```

#### 5. Delete a Task
```http
DELETE /tasks/:id
```

**Response (200 OK):**
```json
{
  "message": "Task deleted successfully"
}
```

### Health Check

```http
GET /health
```

**Response (200 OK):**
```json
{
  "status": "ok"
}
```

## Project Structure

```
backend/
├── cmd/
│   └── server/
│       └── main.go              # Application entry point
├── internal/
│   ├── config/
│   │   └── config.go            # Configuration loading
│   ├── database/
│   │   └── mysql.go             # Database connection
│   ├── dto/
│   │   └── task.dto.go          # Data transfer objects
│   ├── handlers/
│   │   └── task.handler.go      # HTTP handlers/controllers
│   ├── models/
│   │   └── task.model.go        # Database models
│   ├── repositories/
│   │   └── task.repository.go   # Database access layer
│   ├── routes/
│   │   └── routes.go            # Route definitions
│   └── services/
│       └── task.service.go      # Business logic layer
├── build/                        # Compiled binaries
├── .env                          # Environment variables
├── docker-compose.yml            # Docker Compose configuration
├── Dockerfile                    # Docker build configuration
├── go.mod                        # Go module file
├── go.sum                        # Go module checksums
└── README.md                     # Documentation
```

## Architecture

The application follows a **Clean Architecture** pattern:

```
HTTP Handler (Layer 1)
    ↓
Service Layer (Layer 2) - Business Logic
    ↓
Repository Layer (Layer 3) - Data Access
    ↓
Database (Layer 4)
```

- **Handlers**: Accept HTTP requests and call services
- **Services**: Implement business logic and return DTOs
- **Repositories**: Handle database operations using GORM
- **Models**: Represent database schema
- **DTOs**: Define request/response structures

## Installed Packages

```bash
go get github.com/gin-gonic/gin              # Web framework
go get gorm.io/gorm                          # ORM
go get gorm.io/driver/mysql                  # MySQL driver for GORM
go get github.com/go-playground/validator/v10 # Validation
go get github.com/spf13/viper                # Configuration management
```

## Development

### Run Tests
```bash
go test ./...
```

### Run with Hot Reload (optional with air)
```bash
go install github.com/cosmtrek/air@latest
air
```

## Troubleshooting

### Database Connection Error
- Ensure MySQL is running
- Check `.env` file for correct credentials
- Verify database name exists

### Port Already in Use
- Change `APP_PORT` in `.env` file
- Or kill the process using the port:
  ```bash
  # Linux/Mac
  lsof -i :8080 | kill -9

  # Windows
  netstat -ano | findstr :8080
  taskkill /PID <PID> /F
  ```

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Task categories and filtering
- [ ] Task priorities and deadlines
- [ ] Email notifications
- [ ] Task comments and history
- [ ] Unit and integration tests
- [ ] API documentation with Swagger/OpenAPI

## License

MIT License