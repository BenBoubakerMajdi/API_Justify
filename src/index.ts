import express, { Request, Response } from "express" // Import Express and types
import cors from "cors" // Import CORS for handling Cross-Origin Resource Sharing
import dotenv from "dotenv/config" // Load environment variables
import helmet from "helmet" // Import Helmet for security headers
import { apiRouter } from "./route" // Import API routes
import connectToDatabase from "./DBConfig/dbconfig" // Import database connection

// Initialize the Express application
const app = express()

// Connect to the database
connectToDatabase()

// Middleware setup
app.use(express.json()) // Parse JSON requests
app.use(cors()) // Enable CORS
app.use(helmet()) // Secure HTTP headers
app.use(express.text()) // Parse text/plain requests

// Define API routes
app.use("/api", apiRouter)

// Set the port from environment variable or default to 3000
const PORT = process.env.PORT || 3000

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
