"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization; // Get Authorization header
    if (authHeader) {
        const token = authHeader.split(" ")[1]; // Extract token
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || "secret", (err, payload) => {
            if (err) {
                return res.status(403).json({
                    // Token verification failed
                    success: false,
                    message: "Invalid token",
                });
            }
            req.user = payload; // Attach user info to request
            next(); // Proceed to next middleware
        });
    }
    else {
        return res.status(401).json({
            // Missing token
            success: false,
            message: "Token is missing",
        });
    }
};
exports.verifyToken = verifyToken;
