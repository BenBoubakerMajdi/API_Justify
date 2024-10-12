import { Router } from "express"
import { generateToken } from "../contoller" // Import generateToken function

// Exporting token generator route
export const tokenRoute = Router()

// Defining token generator route
tokenRoute.post("/", generateToken as any)
