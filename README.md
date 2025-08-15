Task Management API by Caleb Adebayo
Project Description

This is a RESTful API for managing tasks, built with Node.js, Express, and MongoDB.
The API allows users to register, login, and perform CRUD operations on tasks. Each task is associated with the user who created it. Authentication is handled using JWT (JSON Web Tokens), ensuring secure access to user-specific resources.

Installation & Setup

Prerequisites

Node.js >= 16.x
npm
MongoDB (local or Atlas)
Setup Steps

Clone the repository:

git clone https://github.com/yourusername/project-name.git
cd project-name

Install dependencies: npm install

Create a .env file in the root directory and add: conString=<your_mongodb_connection_string> jwt_secret=<your_jwt_secret_key> PORT=3000

Start the server npm run dev

The server runs on http://localhost:3000.

API Endpoints Authentication Method Endpoint Description POST /api/v1/register Register a new user POST /api/v1/login Login and receive JWT token

Task Management (Protected) Method Endpoint Description POST /api/v1/blog/ Create a new task GET /api/v1/blog/ Get all tasks for logged-in user GET /api/v1/blog/:taskId Get a single task by ID PATCH /api/v1/blog/:taskId Update a task by ID DELETE /api/v1/blog/:taskId Delete a task by ID

Request & Response Examples Register POST /api/v1/register Request body:

json { "name": "John Doe", "email": "john@example.com", "password": "securepassword" }

Response: json { "success": true, "user": { "_id": "64e3f5b6a9d3c2e7f0a12345", "name": "John Doe", "email": "john@example.com", "createdAt": "2025-08-14T22:14:14.633Z", "updatedAt": "2025-08-14T22:14:14.633Z" } }

Login POST /api/v1/login Request body: json { "email": "john@example.com", "password": "securepassword" } Response: json { "success": true, "user": { "userExist": "John Doe", "email": "john@example.com" }, "token": "<JWT_TOKEN>" } Create Task POST /api/v1/blog/ Headers: makefile Authorization: Bearer <JWT_TOKEN> Request body: json { "title": "Finish Project", "description": "Complete the Node.js project by Friday", "tag": "Important" } Response: json { "success": true, "task": { "_id": "64e3f5b6a9d3c2e7f0b56789", "title": "Finish Project", "description": "Complete the Node.js project by Friday", "tag": "Important", "createdBy": "64e3f5b6a9d3c2e7f0a12345", "createdAt": "2025-08-14T22:14:14.633Z", "updatedAt": "2025-08-14T22:14:14.633Z" } } Authentication & Role-Based Access Authentication is done using JWT tokens. Users must include the token in the Authorization header in the format (Bearer ) for protected routes.

Role-based access can be added by extending the auth middleware to check user roles before granting access to specific routes. Currently, tasks are user-specific: each user can only access their own tasks.

Postman Collection You can import this Postman collection to test the API:

Endpoints: /api/v1/register (POST) – Register a user

/api/v1/login (POST) – Login to receive token

/api/v1/blog/ (GET, POST) – List and create tasks

/api/v1/blog/:taskId (GET, PATCH, DELETE) – Single task operations

Example Request Parameters: Body: JSON with title, description, tag (for tasks which can be on these only- 'Important', 'Urgent', 'Later')

Headers: Authorization: Bearer <JWT_TOKEN> for protected endpoints

Example Response: Returns JSON with success flag, task or user details, or errors for invalid inputs.

Authentication Flow: Register a user.

Login to get JWT token.

Include JWT token in Authorization header for all task routes.

Access task routes; only tasks created by the logged-in user are returned/modified.

Happy coding!

Caleb Adebayo
