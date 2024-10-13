"use strict";
// import request from "supertest"
// import express, { Request, Response, NextFunction } from "express"
// import mongoose from "mongoose"
// import { checkRateLimit } from "../../middleware"
// import User from "../../model/User" // Import the User model
// import TokenRequest from '../../middleware/tokenRequest';
// const app = express()
// app.use(express.json()) // Parse JSON requests
// // Apply the rate limit middleware to a test route
// app.post("/test", checkRateLimit as any, (req: TokenRequest, res: Response) => {
//   res.status(200).json({ message: "Passed rate limit check!" })
// })
// describe("checkRateLimit Middleware", () => {
//   beforeAll(async () => {
//     // Only connect if there's no active connection
//     if (mongoose.connection.readyState === 0) {
//       await mongoose.connect("mongodb://localhost:27017/testdb")
//     }
//   })
//   it("should return 400 if no text is provided", async () => {
//     const res = await request(app).post("/test").send({ text: "" })
//     expect(res.status).toBe(400)
//     expect(res.body.message).toBe("Text is required.")
//   })
//   it("should return 404 if user is not found", async () => {
//     const res = await request(app)
//       .post("/test")
//       .send({ text: "Test text" })
//       .set("user", JSON.stringify({ email: "nonexistent@example.com" }))
//     expect(res.status).toBe(404)
//     expect(res.body.message).toBe("User not found.")
//   })
//   it("should return 402 if word count exceeds daily limit", async () => {
//     await User.create({
//       email: "test@example.com",
//       wordCount: 79950, // Close to the limit
//       lastJustifyDate: new Date(),
//     })
//     const res = await request(app)
//       .post("/test")
//       .send({
//         text: "Test text with many words to exceed the limit".repeat(100),
//       })
//       .set("user", JSON.stringify({ email: "test@example.com" }))
//     expect(res.status).toBe(402)
//     expect(res.body.message).toBe("Word limit exceeded. Payment required.")
//   })
//   it("should reset word count for a new day", async () => {
//     const yesterday = new Date()
//     yesterday.setDate(yesterday.getDate() - 1)
//     await User.create({
//       email: "test@example.com",
//       wordCount: 50000,
//       lastJustifyDate: yesterday,
//     })
//     const res = await request(app)
//       .post("/test")
//       .send({ text: "New day text" })
//       .set("user", JSON.stringify({ email: "test@example.com" }))
//     expect(res.status).toBe(200)
//     const user = await User.findOne({ email: "test@example.com" })
//     expect(user?.wordCount).toBe(3) // Assuming "New day text" has 3 words
//   })
//   it("should increment word count within the same day", async () => {
//     await User.create({
//       email: "test@example.com",
//       wordCount: 1000,
//       lastJustifyDate: new Date(),
//     })
//     const res = await request(app)
//       .post("/test")
//       .send({ text: "Test text" })
//       .set("user", JSON.stringify({ email: "test@example.com" }))
//     expect(res.status).toBe(200)
//     const user = await User.findOne({ email: "test@example.com" })
//     expect(user?.wordCount).toBe(1002) // Assuming "Test text" has 2 words
//   })
// })
