# Task Management System with MySQL and Docker Compose

This is a simple task management system that uses Node.js, Express.js, MySQL, and Docker Compose. It provides API endpoints for managing tasks and user authentication.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Getting Started

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   cd task-management

2. Build Docker Compose
    ```bash
    docker-compose build

3. Up Docker Compose
    ```bash
    docker-compose up -d

## API Endpoints
- POST /account/register: Register a new staff member.
- POST /account/login: Authenticate a staff member and get a JWT token.
- POST /task/create: Create a new task.
- PUT /task/assign/:id: Assign a task to a staff member.
- DELETE /task/delete/:id: Delete a task.
- PUT /task/complete/:id: Mark a task as completed.
- GET /tasks/all: Get all tasks.
- GET /tasks/:id: Get a task by ID.

## Postman Collection
To test the API endpoints, you can import the provided Postman collection:

[Task Management Postman Collection](./documents/)

## Folder Structure
config: Configuration files for the database and environment variables.
controllers: Route handlers for API endpoints.
middleware: Custom middleware functions, including authentication.
models: Database models (e.g., User, Task) defined using Sequelize.
routes: Express.js route definitions.
migrations: Database migration files for Sequelize.
tests: Unit tests using Jest and Supertest.

