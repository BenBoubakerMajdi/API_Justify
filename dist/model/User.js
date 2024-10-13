"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/model/User.ts
const mongoose_1 = __importDefault(require("mongoose"));
// User schema definition
const UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Unique email for each user
    },
    wordCount: {
        type: Number,
        required: true,
        default: 0, // Default word count
    },
    lastJustifyDate: {
        type: Date,
        required: false, // Not required for first-time users
    },
});
// User model creation
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
