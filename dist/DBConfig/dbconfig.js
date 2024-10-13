"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const URI = process.env.DB_URI;
// DB URI Validation
if (!URI) {
    throw new Error("DB_URI environment variable is not defined.");
}
// Connecting to the MongoDB database
const connectToDatabase = async () => {
    try {
        await mongoose_1.default.connect(URI);
        console.log("Connected to MongoDB :)");
    }
    catch (error) {
        console.error("Failed to connect to MongoDB :(\n", error);
    }
};
exports.default = connectToDatabase;
