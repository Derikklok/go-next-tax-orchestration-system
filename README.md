# Go Student System

Full-stack task management system with:

- Go + Gin + GORM backend API
- Angular 21 frontend
- MySQL database
- Docker and Docker Compose support

## Project Structure

- backend: Go API server
- frontend: Angular web app
- docker-compose.yml: local container orchestration
- Dockerfile: root-level frontend production image

## Local Development

### 1. Start MySQL

Use your local MySQL instance or start one with Docker.

If using local MySQL, create the database:

CREATE DATABASE task_manager;

### 2. Run Backend

From backend folder:

go run cmd/server/main.go

Backend runs on:

http://localhost:8080

### 3. Run Frontend

From frontend folder:

npm install
ng serve --open

Frontend runs on:

http://localhost:4200

## Docker Development

From project root:

docker compose up --build

Services:

- Frontend: http://localhost:4200
- Backend API: http://localhost:8080
- MySQL: localhost:3307 (mapped to container 3306)

To stop:

docker compose down

To stop and remove DB volume:

docker compose down -v

## Build Individual Images

### Backend Image

docker build -t go-student-backend ./backend

### Frontend Image

docker build -t go-student-frontend ./frontend

## API Base URL

http://localhost:8080/api

## Health Check

http://localhost:8080/health

## Notes

- Backend supports loading config from .env and from environment variables.
- CORS is enabled for local Angular frontend origin.
