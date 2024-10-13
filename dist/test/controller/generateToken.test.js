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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../../index");
const User_1 = __importDefault(require("../../model/User"));
jest.mock("../../model/User"); // Ensure you're mocking the correct path
describe("generateToken Controller", () => {
    const validEmail = "test@example.com";
    const invalidEmail = "invalidemail";
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Only connect if there's no active connection
        if (mongoose_1.default.connection.readyState === 0) {
            yield mongoose_1.default.connect("mongodb://localhost:27017/testdb");
        }
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Close the connection after tests are done
        yield mongoose_1.default.connection.close();
    }), 10000); // Increase the timeout to 10000 ms
    it("should return 400 if no email is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).post("/api/token").send({});
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Please type your email");
    }));
    it("should return 400 if email format is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app)
            .post("/api/token")
            .send({ email: invalidEmail });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Invalid email format, please check your email");
    }));
    it("should create a new user and return a token for a valid email", () => __awaiter(void 0, void 0, void 0, function* () {
        ;
        User_1.default.findOne.mockResolvedValue(null);
        const res = yield (0, supertest_1.default)(index_1.app)
            .post("/api/token")
            .send({ email: validEmail });
        expect(res.status).toBe(200);
        expect(res.body.email).toBe(validEmail);
        expect(jsonwebtoken_1.default.verify(res.body.token, process.env.SECRET_KEY)).toBeTruthy();
    }));
    it("should return a token for an existing user", () => __awaiter(void 0, void 0, void 0, function* () {
        ;
        User_1.default.findOne.mockResolvedValue({ email: validEmail });
        const res = yield (0, supertest_1.default)(index_1.app)
            .post("/api/token")
            .send({ email: validEmail });
        expect(res.status).toBe(200);
        expect(res.body.email).toBe(validEmail);
        expect(jsonwebtoken_1.default.verify(res.body.token, process.env.SECRET_KEY)).toBeTruthy();
    }));
});
