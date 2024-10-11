import { Request } from "express";


// Extend the existing Express Request interface
declare module "express" {
  // Extend the Request interface
  export interface Request {
    // property to store user information associated with the request
    user?: string; 
  }
}
