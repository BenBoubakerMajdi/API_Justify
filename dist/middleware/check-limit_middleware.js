"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRateLimit = void 0;
const User_1 = __importDefault(require("../model/User")); // User model for database interactions
const MAX_WORD_LIMIT = 80000; // Maximum allowed words per day
const checkRateLimit = async (req, res, next) => {
    const { email } = req.user; // Get user email from request
    const text = req.body; // Get text from request body
    // Validate text input
    if (text.trim() === "") {
        return res.status(400).json({ message: "Text is required." });
    }
    const wordCountInText = text.split(" ").filter(Boolean).length; // Count words in the text
    try {
        const user = await User_1.default.findOne({ email }); // Find user by email
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const now = new Date();
        const lastJustifyDate = user.lastJustifyDate;
        // Check if the current request exceeds the word limit
        if (wordCountInText > MAX_WORD_LIMIT) {
            return res.status(402).json({
                message: "Word limit exceeded. Payment required.",
            });
        }
        // Compare dates to reset word count if necessary
        const currentDateString = now.toISOString().split("T")[0];
        const lastJustifyDateString = lastJustifyDate
            ? lastJustifyDate.toISOString().split("T")[0]
            : null;
        // Reset word count if it's the first request or a new day
        if (!lastJustifyDateString || currentDateString !== lastJustifyDateString) {
            user.wordCount = wordCountInText;
            user.lastJustifyDate = now;
        }
        else {
            // Check total words for the current day
            const totalWordsToday = user.wordCount + wordCountInText;
            if (totalWordsToday > MAX_WORD_LIMIT) {
                return res.status(402).json({
                    message: "Word limit exceeded. Payment required.",
                });
            }
            user.wordCount = totalWordsToday; // Update word count
        }
        await user.save(); // Save updated user data
        next(); // Proceed to the next middleware
    }
    catch (error) {
        console.error("Error checking rate limit:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
exports.checkRateLimit = checkRateLimit;
