import express, { Request, Response } from "express" // Import Express and types for Request and Response
import cors from "cors" // Import CORS for handling Cross-Origin Resource Sharing
import dotenv from "dotenv" // Import dotenv to manage environment variables
import helmet from "helmet" // Import Helmet for securing HTTP headers
import { apiRouter } from "./route" // Import index route

// Initialize the Express application
const app = express()

// Load environment variables from .env file
dotenv.config()

// Middleware Setup
app.use(express.json()) // Parse incoming JSON requests
app.use(cors()) // Enable CORS for all routes
app.use(helmet()) // Set security HTTP headers
app.use(express.text()) // Parse incoming requests with text/plain content-type

// Define API Routes
app.use("/api", apiRouter)

// Set the port from environment variable or default to 3000
const PORT = process.env.PORT || 3000

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`) 
})
