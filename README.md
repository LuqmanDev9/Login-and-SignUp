# 🔐 Login & Signup Authentication System

A simple full-stack authentication system built with **HTML, CSS, JavaScript, Node.js, and Express.js**.

The project allows users to create an account, log in, and access protected routes using JWT-based authentication.

## Features

* User signup
* User login
* Password hashing with bcrypt
* JWT authentication
* HTTP-only cookies
* Protected routes
* Input validation with Zod
* Login rate limiting
* Security headers with Helmet
* Responsive dark-themed UI

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js
* JSON Web Tokens (JWT)
* bcrypt
* Zod
* express-rate-limit
* cookie-parser
* Helmet

## Authentication Flow

### Signup

1. User enters a username and password.
2. The backend validates the input using Zod.
3. The backend checks if the username already exists.
4. The password is hashed using bcrypt.
5. The new user is saved to `users.json`.

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

Create a `.env` file in the root directory:

```env
PORT=3000
JWT_SECRET=your_secret_key_here
```

Do not commit your `.env` file to GitHub.

## Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node server.js
```

Then open:

```text
http://localhost:3000
```

## Security

This project includes several basic security practices:

* Passwords are hashed with bcrypt.
* Passwords are not stored as plain text.
* Authentication tokens are stored in HTTP-only cookies.
* Login attempts are rate-limited.
* User input is validated with Zod.
* Helmet is used for security-related HTTP headers.
* Generic login errors help avoid revealing whether a username exists.

## Project Structure

```text
project/
├── public/
│   └── index.html
├── server.js
├── middleware.js
├── users.json
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── README.md
```

## Future Improvements

* Replace `users.json` with PostgreSQL or MongoDB.
* Add email verification with OTP.
* Add password reset functionality.
* Add a logout route.
* Add refresh tokens.
* Add OAuth authentication.
* Deploy the application.

## Disclaimer

This project was created for learning and demonstrating full-stack authentication concepts. File-based JSON storage is used for simplicity and should be replaced with a production-ready database for real applications.
