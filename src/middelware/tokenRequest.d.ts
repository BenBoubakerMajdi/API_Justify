// src/types/TokenRequest.ts
import { Request } from "express"

// Extend the existing Express Request interface
export default interface TokenRequest extends Request {
  user: {
    email: string // Define the expected properties in user
  }
}
