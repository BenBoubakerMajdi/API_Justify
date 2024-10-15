import request from "supertest" //Import request to send test requests
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { app } from "../../index"
import User from "../../model/User"

jest.mock("../../model/User") //Ensure mocking the correct path

describe("generateToken Controller", () => {
  const validEmail = "test@example.com"
  const invalidEmail = "invalidemail"

  beforeAll(async () => {
    // Only connect if there's no active connection
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect("mongodb://localhost:27017/testdb")
    }
  })

  afterAll(async () => {
    // Close the connection after tests are done
    await mongoose.connection.close()
  }, 10000) // Increase the timeout to 10000 ms

  it("should return 400 if no email is provided", async () => {
    const res = await request(app).post("/api/token").send({})
    expect(res.status).toBe(400)
    expect(res.body.message).toBe("Please type your email")
  })

  it("should return 400 if email format is invalid", async () => {
    const res = await request(app)
      .post("/api/token")
      .send({ email: invalidEmail })

    expect(res.status).toBe(400)
    expect(res.body.message).toBe(
      "Invalid email format, please check your email"
    )
  })

  it("should create a new user and return a token for a valid email", async () => {
    ;(User.findOne as jest.Mock).mockResolvedValue(null)

    const res = await request(app)
      .post("/api/token")
      .send({ email: validEmail })

    expect(res.status).toBe(200)
    expect(res.body.email).toBe(validEmail)
    expect(jwt.verify(res.body.token, process.env.SECRET_KEY)).toBeTruthy()
  })

  it("should return a token for an existing user", async () => {
    ;(User.findOne as jest.Mock).mockResolvedValue({ email: validEmail })

    const res = await request(app)
      .post("/api/token")
      .send({ email: validEmail })

    expect(res.status).toBe(200)
    expect(res.body.email).toBe(validEmail)
    expect(jwt.verify(res.body.token, process.env.SECRET_KEY)).toBeTruthy()
  })
})
