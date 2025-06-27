# Node.js/Express.js JWT Authentication API

This is a robust RESTful authentication system built with Node.js, Express.js, MongoDB, and JSON Web Tokens (JWT). It includes features like:

* User Registration
* Login
* Forgot Password
* Password Reset
* Secure Logout
* Token-based Authentication
* Swagger API Documentation

---

## Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* bcryptjs (password hashing)
* jsonwebtoken (JWT)
* nodemailer (email sending)
* express-validator (input validation)
* Swagger (API documentation)

---

## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Obitope-Eniola-Nathaniel/Authentication-System.git
cd basic-authentication
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

```env
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret_key
JWT_EXPIRE=1d

EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_mailtrap_user
EMAIL_PASS=your_mailtrap_pass

CLIENT_URL=http://localhost:3000
```

> Replace the placeholders with your actual environment values.

---

### 4. Run the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

---

## API Endpoints

| Method | Route                             | Description           |
| ------ | --------------------------------- | --------------------- |
| POST   | `/api/auth/register`              | Register a new user   |
| POST   | `/api/auth/login`                 | Login user            |
| POST   | `/api/auth/forgot-password`       | Send reset email      |
| POST   | `/api/auth/reset-password/:token` | Reset password        |
---

## API Docs (Swagger)

Visit: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

Interactive documentation powered by **Swagger UI**.

---

## Authentication

All protected routes require an `Authorization` header:

```http
Authorization: Bearer <your_jwt_token>
```

---

## Folder Structure

```
basic-authentication/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── docs/          # Swagger config
├── app.js
├── .env
├── README.md
```

---

## Reset Password Flow

1. User sends email to `/forgot-password`
2. Receives reset link with token
3. Uses `/reset-password/:token` to set a new password

---

## License

This project is open-source and free to use under the MIT License.
