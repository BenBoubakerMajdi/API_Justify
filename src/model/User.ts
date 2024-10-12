// src/model/User.ts
import mongoose, { Document } from "mongoose"

// User interface extending Mongoose Document
export interface IUser extends Document {
  email: string
  wordCount: number
  lastJustifyDate?: Date | null // Optional for first-time users
}

// User schema definition
const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true, // Unique email for each user
  },
  wordCount: {
    type: Number,
    required: true,
    default: 0, // Default word count
  },
  lastJustifyDate: {
    type: Date,
    required: false, // Not required for first-time users
  },
})

// User model creation
const User = mongoose.model<IUser>("User", UserSchema)
export default User
