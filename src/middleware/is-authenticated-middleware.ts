import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import "dotenv/config"
import TokenRequest from "./tokenRequest"

export const verifyToken = (
  req: TokenRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization // Get Authorization header

  if (authHeader) {
    const token = authHeader.split(" ")[1] // Extract token

    jwt.verify(token, process.env.SECRET_KEY || "secret", (err, payload) => {
      if (err) {
        return res.status(403).json({
          // Token verification failed
          success: false,
          message: "Invalid token",
        })
      }

      req.user = payload as { email: string } // Attach user info to request
      next() // Proceed to next middleware
    })
  } else {
    return res.status(401).json({
      // Missing token
      success: false,
      message: "Token is missing",
    })
  }
}
