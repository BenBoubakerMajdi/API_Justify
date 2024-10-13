"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../model/User"));
/**
 * Validates the format of an email address.
 * Returns true if the email format is valid, otherwise false.
 */
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
/**
 * Generates a JWT token for the provided email address and creates a new user if necessary.
 * Responds with the token or an error message.
 */
const generateToken = async (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ message: "Please type your email" });
    }
    if (!isValidEmail(email)) {
        return res
            .status(400)
            .json({ message: "Invalid email format, please check your email" });
    }
    const existingUser = await User_1.default.findOne({ email });
    if (!existingUser) {
        const newUser = new User_1.default({
            email: email,
            wordCount: 0,
            lastJustifyDate: null,
        });
        await newUser.save();
    }
    const token = jsonwebtoken_1.default.sign({ email }, process.env.SECRET_KEY, { expiresIn: "1d" });
    return res.status(200).json({ email: email, token: token });
};
exports.generateToken = generateToken;
