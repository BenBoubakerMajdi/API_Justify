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
// src/test/middleware/verifyToken.test.ts
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("../../middleware"); // Adjust the path as necessary
jest.mock("jsonwebtoken");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// A sample route that uses the verifyToken middleware
app.get("/protected", (req, res, next) => {
    // Here, we need to cast req to TokenRequest
    (0, middleware_1.verifyToken)(req, res, next);
}, (req, res) => {
    res.status(200).json({ message: "Protected data", user: req.user });
});
describe("verifyToken middleware", () => {
    it("should return 401 if no token is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/protected");
        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            success: false,
            message: "Token is missing",
        });
    }));
    it("should return 403 for an invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = "invalidToken";
        jsonwebtoken_1.default.verify.mockImplementation((token, secret, callback) => {
            callback(new Error("Invalid token"), null);
        });
        const response = yield (0, supertest_1.default)(app)
            .get("/protected")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(403);
        expect(response.body).toEqual({
            success: false,
            message: "Invalid token",
        });
    }));
    it("should call next() and return user data for a valid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = "validToken";
        const payload = { email: "user@example.com" };
        jsonwebtoken_1.default.verify.mockImplementation((token, secret, callback) => {
            callback(null, payload);
        });
        const response = yield (0, supertest_1.default)(app)
            .get("/protected")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: "Protected data",
            user: payload,
        });
    }));
});
