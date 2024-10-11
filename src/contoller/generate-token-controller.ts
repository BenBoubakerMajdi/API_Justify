import { Request, Response } from "express" 
import "dotenv/config" // Load environment variables from .env file
import jwt from "jsonwebtoken" // Importing the jsonwebtoken library for creating JWTs

/**
 * Validates the format of an email address using a regular expression.
 *
 * @param email 
 * @returns boolean - Returns true if the email format is valid, otherwise false.
 */
const isValidEmail = (email: string): boolean => {
  // Regular expression for validating an email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) // Returns the result of the regex test
}

/**
 * Generates a JWT token for the provided email address.
 *
 * @param req - The request object from Express, containing the request data.
 * @param res - The response object from Express used to send a response back to the client.
 *
 * @returns void - Sends a JSON response containing the token or an error message.
 */
export const generateToken = (req: Request, res: Response): any => {
  const email = req.body.email // Extract the email from the request body

  // Check if the email is provided
  if (!email) {
    return res.status(400).json({ message: "Please type your email" }) // Respond with a 400 Bad Request if no email is provided
  }

  // Validate the email format
  if (!isValidEmail(email)) {
    return res
      .status(400)
      .json({ message: "Invalid email format, Please check your email" }) // Respond with a 400 Bad Request if the email format is invalid
  }

  // Prepare the payload for the JWT token
  const payload = { email }

  // Define options for the JWT token
  const options = {
    expiresIn: "1d", // Token expiration set to 1 day
  }

  // Generate the JWT token using the payload and the secret key from environment variables
  const token = jwt.sign(payload, process.env.SECRET_KEY, options)

  // Send the generated token and email back in the response with a 200 OK status
  return res.status(200).json({ email: email, token: token })
}
