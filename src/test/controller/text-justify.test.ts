import request from "supertest" //Import request to send test requests
import { app } from "../../index" 
import jwt from "jsonwebtoken"
import User from "../../model/User" // Import user model for mocking 
import "dotenv/config" //load environment variables

// Mocking User Model
jest.mock("../../model/User")

const mockToken = jwt.sign(
  { email: "test@example.com" },
  process.env.SECRET_KEY || "secret"
)

describe("justifyTextHandler Controller", () => {
  beforeAll(() => {
    // Setting up a mock implementation for User.findOne
    ;(User.findOne as jest.Mock).mockImplementation(async ({ email }) => {
      if (email === "test@example.com") {
        return {
          email: "test@example.com",
          wordCount: 0,
          lastJustifyDate: null,
          save: jest.fn().mockResolvedValue(true), // Mock the save function
        }
      }
      return null // Simulate a user not found scenario
    })
  })

  it("should return justified text for valid input", async () => {
    const inputText = "This is a test of the justification function."
    const expectedOutput = "This is a test of the justification function." // Adjust based on expected output

    const res = await request(app)
      .post("/api/justify")
      .set("Content-Type", "text/plain") // Set Content-Type for plain text
      .set("Authorization", `Bearer ${mockToken}`) // Add authorization header
      .send(inputText) // Send the input text

    expect(res.status).toBe(200)
    expect(res.type).toBe("text/plain")
    expect(res.text).toBe(expectedOutput) // Adjust as necessary
  })

  it("should return 400 if no text is provided", async () => {
    const res = await request(app)
      .post("/api/justify")
      .set("Content-Type", "text/plain") // Set Content-Type for plain text
      .set("Authorization", `Bearer ${mockToken}`) // Add authorization header
      .send("") // Send an empty string

    expect(res.status).toBe(400)
    expect(res.body.message).toBe("Text is required.")
  })
})
