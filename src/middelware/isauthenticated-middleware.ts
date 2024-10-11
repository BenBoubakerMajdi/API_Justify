import { NextFunction, Request, Response } from "express" // Import Request, Response, and NextFunction types from Express
import jwt, { JwtPayload } from "jsonwebtoken" // Import the jsonwebtoken library and JwtPayload type
import "dotenv/config" // Load environment variables from .env file

/**
 * Middleware function to verify the JWT token from the request headers.
 *
 * @param req - The request object from Express, containing the HTTP request data.
 * @param res - The response object from Express, used to send a response back to the client.
 * @param next - The next middleware function in the Express application.
 *
 * @returns void - Calls the next middleware or sends an error response if verification fails.
 */
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const authHeader = req.headers.authorization // Extract the Authorization header from the request

  // Check if the Authorization header exists
  if (authHeader) {
    // Split the header to extract the token
    const token = authHeader.split(" ")[1] // Get the token from the header (Bearer <token>)

    // Verify the token using the secret key from environment variables
    jwt.verify(token, process.env.SECRET_KEY || "secret", (err, payload) => {
      // If verification fails, send a 403 Forbidden response
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid token", // Message indicating the token is not valid
        })
      }

      // If verification is successful, attach the payload to the request object
      req.user = payload as string // Assign the payload (user information) to req.user

      // Call the next middleware function in the stack
      return next()
    })
  } else {
    // If the Authorization header is missing, send a 401 Unauthorized response
    return res.status(401).json({
      success: false,
      message: "Token is missing", // Message indicating the token is missing
    })
  }
}
