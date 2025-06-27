// Import required packages
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Import authentication routes
const authRoutes = require("./routes/auth");

// Start the express app
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

app.use("/api/auth", authRoutes);


const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Define port from environment variable or fallback to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
