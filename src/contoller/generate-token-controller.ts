import { Request, Response } from "express"
import "dotenv/config"
import jwt from "jsonwebtoken"
import User from "../model/User"

/**
 * Validates the format of an email address.
 * Returns true if the email format is valid, otherwise false.
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Generates a JWT token for the provided email address and creates a new user if necessary.
 * Responds with the token or an error message.
 */
export const generateToken = async (req: Request, res: Response) => {
  const email = req.body.email

  if (!email) {
    return res.status(400).json({ message: "Please type your email" })
  }

  if (!isValidEmail(email)) {
    return res
      .status(400)
      .json({ message: "Invalid email format, please check your email" })
  }

  const existingUser = await User.findOne({ email })
  if (!existingUser) {
    const newUser = new User({
      email: email,
      wordCount: 0,
      lastJustifyDate: null,
    })
    await newUser.save()
  }

  const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "1d" })

  return res.status(200).json({ email: email, token: token })
}
