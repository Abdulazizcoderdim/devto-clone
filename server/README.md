# Dev.to Clone - Full Stack Blogging Platform

A modern blogging platform inspired by Dev.to, built with React, Node.js, and Prisma.

## Project Structure

```
├── server/                 # Backend server
│   ├── config/            # Configuration files
│   ├── controllers/       # Request handlers
│   ├── dtos/              # Data Transfer Objects
│   ├── errors/            # Custom error handling
│   ├── middlewares/       # Express middlewares
│   ├── models/            # Database models
│   ├── prisma/            # Prisma ORM configuration
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── shared/            # Shared utilities
│   ├── utils/             # Helper functions
│   ├── app.js             # Main application file
│   └── package.json       # Backend dependencies
├── react/                 # Frontend React application
├── socket/                # WebSocket server
└── admin-panel/          # Admin dashboard
```

## Tech Stack

### Backend

- Node.js
- Express.js
- Prisma ORM
- JWT Authentication
- MongoDB
- WebSocket

### Frontend

- React
- TypeScript
- SWR for data fetching
- Tailwind CSS
- Shadcn UI Components

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the server directory with:

   ```
   DATABASE_URL="your_mongodb_connection_string"
   JWT_SECRET="your_jwt_secret"
   PORT=5000
   ```

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the react directory:

   ```bash
   cd react
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user profile

### Posts

- `GET /api/posts` - Get all posts (paginated)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Comments

- `GET /api/posts/:postId/comments` - Get post comments
- `POST /api/posts/:postId/comments` - Add comment
- `DELETE /api/comments/:id` - Delete comment

### Tags

- `GET /api/tags` - Get all tags
- `POST /api/tags` - Create new tag
- `GET /api/tags/:id` - Get tag details

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `POST /api/users/:id/follow` - Follow user
- `DELETE /api/users/:id/follow` - Unfollow user

## Features

- User authentication and authorization
- Create, read, update, and delete blog posts
- Comment system
- Tag management
- User following system
- Real-time notifications
- Admin dashboard
- Responsive design
- Dark/Light mode

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
