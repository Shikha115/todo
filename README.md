# Taskify

A Full-Stack Task Management Application built with React, Node.js, Express, and MongoDB.

## Live Demo

[https://taskify-s4bt.onrender.com](https://taskify-s4bt.onrender.com)

## Features

The app includes the following features:

- **User Authentication**: Sign up and sign in functionality with JWT tokens
- **Create a Todo**: Authenticated users can create new todos with title and description
- **View Todos**: Users can view all their existing todos
- **Mark Todo as Done**: Users can mark todos as completed or pending
- **Filter Todos**: Filter todos by All, Completed, or Pending status
- **Theme Toggle**: Switch between light and dark themes (persisted in localStorage)
- **Responsive Design**: Mobile-friendly layout with Tailwind CSS
- **Real-time Updates**: Instant UI updates with React Query

## Tech Stack

### Frontend

- React 19 with Vite
- React Router for navigation
- TanStack React Query for state management
- Zustand for theme state management
- Tailwind CSS for styling
- Axios for API calls

### Backend

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- CORS for cross-origin requests

## Setup Guide

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Clone the repository

```
git clone https://github.com/Shikha115/todo.git
cd task-management
```

### Backend Setup

1. Navigate to backend directory:

```
cd backend
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file in the backend directory with the following variables:

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the backend server:

```
npm start
```

The server will run on http://localhost:8000

### Frontend Setup

1. Open a new terminal and navigate to frontend directory:

```
cd frontend
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm run dev
```

The app will run on http://localhost:5173

### Production Build

To build the frontend for production:

```
cd frontend
npm run build
```

The build files will be in the `dist` directory.

## API Endpoints

### Authentication

- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login

### Todos (Protected routes)

- `GET /api/todo` - Get all todos for authenticated user
- `POST /api/todo` - Create a new todo
- `PUT /api/todo/:id` - Update a todo (mark as completed/pending)
- `DELETE /api/todo/:id` - Delete a todo

## Deployment

### Backend Deployment (Render)

1. Connect your GitHub repository to Render
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables in Render dashboard

### Frontend Deployment (Render)

1. Connect your GitHub repository to Render
2. Set root directory: `frontend`
3. Set build command: `npm run build`
4. Set start command: `npm start`
5. Add environment variables if needed

## Project Structure

```
task-management/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── hooks/
│   │   └── store/
│   ├── public/
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
