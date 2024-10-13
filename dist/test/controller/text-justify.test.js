"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest")); //Import request to send test requests
const index_1 = require("../../index");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../model/User")); // Import user model for mocking 
require("dotenv/config"); //load environment variables
// Mocking User Model
jest.mock("../../model/User");
const mockToken = jsonwebtoken_1.default.sign({ email: "test@example.com" }, process.env.SECRET_KEY || "secret");
describe("justifyTextHandler Controller", () => {
    beforeAll(() => {
        // Setting up a mock implementation for User.findOne
        ;
        User_1.default.findOne.mockImplementation(async ({ email }) => {
            if (email === "test@example.com") {
                return {
                    email: "test@example.com",
                    wordCount: 0,
                    lastJustifyDate: null,
                    save: jest.fn().mockResolvedValue(true), // Mock the save function
                };
            }
            return null; // Simulate a user not found scenario
        });
    });
    it("should return justified text for valid input", async () => {
        const inputText = "This is a test of the justification function.";
        const expectedOutput = "This is a test of the justification function."; // Adjust based on expected output
        const res = await (0, supertest_1.default)(index_1.app)
            .post("/api/justify")
            .set("Content-Type", "text/plain") // Set Content-Type for plain text
            .set("Authorization", `Bearer ${mockToken}`) // Add authorization header
            .send(inputText); // Send the input text
        expect(res.status).toBe(200);
        expect(res.type).toBe("text/plain");
        expect(res.text).toBe(expectedOutput); // Adjust as necessary
    });
    it("should return 400 if no text is provided", async () => {
        const res = await (0, supertest_1.default)(index_1.app)
            .post("/api/justify")
            .set("Content-Type", "text/plain") // Set Content-Type for plain text
            .set("Authorization", `Bearer ${mockToken}`) // Add authorization header
            .send(""); // Send an empty string
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Text is required.");
    });
});
