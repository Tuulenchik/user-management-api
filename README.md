# User Management API

A REST API for user registration, authentication, and role-based user management.

This project was built with **Node.js**, **Express**, **TypeScript**, **MongoDB/Mongoose**, **Zod**, **JWT**, and **Jest/Supertest**. It demonstrates backend fundamentals such as request validation, authentication, authorization, centralized error handling, and protected routes.

## Features

- User registration with hashed passwords
- User login with JWT access token
- Role-based authorization (`user`, `admin`)
- Protected routes with Bearer token authentication
- Users can view and update their own profile
- Admins can list users, filter users by role, and delete users
- Request validation with Zod
- Centralized error handling
- Security middleware with Helmet, CORS, and rate limiting
- Integration tests with Jest and Supertest

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- Zod
- JSON Web Token
- bcrypt
- Jest + Supertest

## Project Structure
```text
src/
  configs/
  controllers/
  middleware/
    errorHandler/
    security/
    validators/
  models/
  routes/
  schemas/
  services/
  utils/
```

## Environment variables

Create a .env file in the root directory:
```
PORT=3000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_ORIGIN=http://localhost:3000
```
## Installation

```bash
npm install
```

## Run the Project

```bash
npm run dev
```

the server will start on: `http://localhost:3000`

## Health check

`GET /health`

## API Endpoints

## Auth

**Register:**


`POST /auth/register`

Example request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123!"
}
```

**Login:**

`POST /auth/login`

Example request body:
```json
{
  "email": "john@example.com",
  "password": "Password123!"
}
```
Example response:
```json
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```
### Users

Get all users (admin only):
`GET /users`

Optional query:
`GET /users?role=admin`

Get one user (self or admin):
`GET /users/:id`

Update one user (self or admin):
`PATCH /users/:id`

Example request body:
```JSON
{
  "name": "Updated Name"
}
```

Delete one user (admin only):
`DELETE /users/:id`

## Authorization rules
- `GET /users` → admin only
- `GET /users/:id` → admin or the same user
- `PATCH /users/:id` → admin or the same user
- only admins can change roles
- admins can delete users
- users cannot delete themselves
  
## Validation
The API uses Zod to validate:
- registration input
- login input
- update payloads
- route params
- query params

## Testing
Run tests with:
```bash
npm test
```
Tests cover authentication and protected user routes.

## What I learned
Through this project I improved my understanding of:
- Express middleware flow
- JWT authentication
- role-based access control
- request validation with Zod
- organizing backend code into controllers, services, models, and middleware