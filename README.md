# 🔐 Login & Signup Authentication System

A simple full-stack authentication system built with **Next.js** and **Express.js**.

The project allows users to create an account, log in, and access protected routes using JWT-based authentication.

## Features

- User signup
- User login
- Password hashing with bcrypt
- JWT authentication
- HTTP-only cookies
- Protected routes
- Input validation with Zod
- Login rate limiting
- Security headers with Helmet
- Responsive dark-themed UI

## Tech Stack

### Frontend

- Next.js
- React
- CSS

### Backend

- Node.js
- Express.js
- JSON Web Tokens (JWT)
- bcrypt
- Zod
- express-rate-limit
- cookie-parser
- Helmet

## Authentication Flow

### Signup

1. User enters a username and password.
2. The backend validates the input using Zod.
3. The backend checks if the username already exists.
4. The password is hashed using bcrypt.
5. The new user is saved.

### Login

1. User enters their username and password.
2. The backend finds the matching user.
3. bcrypt compares the entered password with the stored password hash.
4. If valid, the backend creates a JWT.
5. The JWT is stored in an HTTP-only cookie.

### Protected Routes

Protected routes use authentication middleware that:

1. Reads the JWT from the `accessToken` cookie.
2. Verifies the JWT using the server's secret key.
3. Adds the decoded user information to `req.user`.
4. Allows the request to continue if the token is valid.

## Environment Variables

Create a `.env` file:

```env
PORT=5000
JWT_SECRET=your_secret_key_here
