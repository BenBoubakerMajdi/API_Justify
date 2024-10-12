import mongoose from "mongoose"
import dotenv from "dotenv/config"

const URI = process.env.DB_URI

// DB URI Validation
if (!URI) {
  throw new Error("DB_URI environment variable is not defined.")
}

// Function to connect to the MongoDB database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(URI)
    console.log("Connected to MongoDB :)")
  } catch (error) {
    console.error("Failed to connect to MongoDB :(\n", error)
  }
}

export default connectToDatabase;

