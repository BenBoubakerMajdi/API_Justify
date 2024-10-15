"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest")); //Import request to send test requests
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../../index");
const User_1 = __importDefault(require("../../model/User"));
jest.mock("../../model/User"); //Ensure mocking the correct path
describe("generateToken Controller", () => {
    const validEmail = "test@example.com";
    const invalidEmail = "invalidemail";
    beforeAll(async () => {
        // Only connect if there's no active connection
        if (mongoose_1.default.connection.readyState === 0) {
            await mongoose_1.default.connect("mongodb://localhost:27017/testdb");
        }
    });
    afterAll(async () => {
        // Close the connection after tests are done
        await mongoose_1.default.connection.close();
    }, 10000); // Increase the timeout to 10000 ms
    it("should return 400 if no email is provided", async () => {
        const res = await (0, supertest_1.default)(index_1.app).post("/api/token").send({});
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Please type your email");
    });
    it("should return 400 if email format is invalid", async () => {
        const res = await (0, supertest_1.default)(index_1.app)
            .post("/api/token")
            .send({ email: invalidEmail });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Invalid email format, please check your email");
    });
    it("should create a new user and return a token for a valid email", async () => {
        ;
        User_1.default.findOne.mockResolvedValue(null);
        const res = await (0, supertest_1.default)(index_1.app)
            .post("/api/token")
            .send({ email: validEmail });
        expect(res.status).toBe(200);
        expect(res.body.email).toBe(validEmail);
        expect(jsonwebtoken_1.default.verify(res.body.token, process.env.SECRET_KEY)).toBeTruthy();
    });
    it("should return a token for an existing user", async () => {
        ;
        User_1.default.findOne.mockResolvedValue({ email: validEmail });
        const res = await (0, supertest_1.default)(index_1.app)
            .post("/api/token")
            .send({ email: validEmail });
        expect(res.status).toBe(200);
        expect(res.body.email).toBe(validEmail);
        expect(jsonwebtoken_1.default.verify(res.body.token, process.env.SECRET_KEY)).toBeTruthy();
    });
});
