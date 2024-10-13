"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../index"); // Adjust according to your project structure
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../model/User")); // Import your User model
require("dotenv/config");
// Mocking User Model
jest.mock("../../model/User");
const mockToken = jsonwebtoken_1.default.sign({ email: "test@example.com" }, process.env.SECRET_KEY || "secret");
describe("justifyTextHandler Controller", () => {
    beforeAll(() => {
        // Setting up a mock implementation for User.findOne
        ;
        User_1.default.findOne.mockImplementation((_a) => __awaiter(void 0, [_a], void 0, function* ({ email }) {
            if (email === "test@example.com") {
                return {
                    email: "test@example.com",
                    wordCount: 0,
                    lastJustifyDate: null,
                    save: jest.fn().mockResolvedValue(true), // Mock the save function
                };
            }
            return null; // Simulate a user not found scenario
        }));
    });
    it("should return justified text for valid input", () => __awaiter(void 0, void 0, void 0, function* () {
        const inputText = "This is a test of the justification function.";
        const expectedOutput = "This is a test of the justification function."; // Adjust based on expected output
        const res = yield (0, supertest_1.default)(index_1.app)
            .post("/api/justify")
            .set("Content-Type", "text/plain") // Set Content-Type for plain text
            .set("Authorization", `Bearer ${mockToken}`) // Add authorization header
            .send(inputText); // Send the input text
        expect(res.status).toBe(200);
        expect(res.type).toBe("text/plain");
        expect(res.text).toBe(expectedOutput); // Adjust as necessary
    }));
    it("should return 400 if no text is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app)
            .post("/api/justify")
            .set("Content-Type", "text/plain") // Set Content-Type for plain text
            .set("Authorization", `Bearer ${mockToken}`) // Add authorization header
            .send(""); // Send an empty string
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Text is required.");
    }));
});
