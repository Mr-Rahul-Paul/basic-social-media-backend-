# Social Media Backend

A simple social media backend built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, logout)
- Create posts
- Like/unlike posts
- Edit posts
- View user profile with their posts

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Security**: bcrypt for password hashing
- **Frontend**: EJS templates, Tailwind CSS

## Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/Mr-Rahul-Paul/social-media-backend.git
   cd social-media-backend
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Make sure MongoDB is running**
4. **Start the server**
   ```sh
   npm start
   ```
5. **Visit** `http://localhost:3000`

## API Routes

| Method | Endpoint     | Description          |
|--------|-------------|----------------------|
| POST   | `/register` | Create new user      |
| POST   | `/login`    | User login           |
| GET    | `/logout`   | User logout          |
| GET    | `/profile`  | View user profile    |
| POST   | `/post`     | Create new post      |
| GET    | `/like/:id` | Like/unlike post     |
| GET    | `/edit/:id` | Edit post            |
| POST   | `/update/:id` | Update post         |

Feel free to contribute and improve this project!
