# MERN Task Manager (Interview Test - Section 1)

This project is a full MERN Task Manager app with authentication and protected task CRUD operations.

## Tech Stack
- MongoDB + Mongoose
- Express.js
- React.js (Vite)
- Node.js
- JWT Authentication
- Bootstrap 5

## Features Implemented
- User registration and login with JWT
- Password hashing using bcrypt
- Protected routes using auth middleware
- Task CRUD (Create, Read, Update, Delete)
- Each task linked to the logged-in user
- API rate limiting using `express-rate-limit`
- Global auth state on frontend using React Context
- Protected dashboard route in React Router
- Basic form validation on register/login
- Clean MVC structure in backend
- `.env` usage for secrets/config

## Folder Structure
- `backend/` - API server (MVC pattern)
- `frontend/` - React app

## Setup Instructions

### 1) Backend setup
1. Go to backend folder:
   ```bash
   cd backend
   ```
2. Create `.env` from `.env.example` and update values.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start server:
   ```bash
   npm run dev
   ```

Backend runs on `http://localhost:5000` by default.

### 2) Frontend setup
1. Go to frontend folder:
   ```bash
   cd frontend
   ```
2. Create `.env` from `.env.example`.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start app:
   ```bash
   npm run dev
   ```

Frontend runs on `http://localhost:5173` by default.

## API Endpoints

### Auth
- `POST /api/auth/register`
  - body: `{ "name": "John", "email": "john@mail.com", "password": "123456" }`
- `POST /api/auth/login`
  - body: `{ "email": "john@mail.com", "password": "123456" }`

### Tasks (Protected)
Include header:
`Authorization: Bearer <token>`

- `GET /api/tasks` - list logged-in user's tasks
- `POST /api/tasks` - create task
  - body: `{ "title": "My task", "description": "optional" }`
- `PUT /api/tasks/:id` - update task
  - body: `{ "title": "Updated", "description": "...", "completed": true }`
- `DELETE /api/tasks/:id` - delete task

## Notes
- This implementation is focused on **Section 1 (Practical)** only.
- JWT is stored in localStorage in frontend for simplicity in this test setup.
