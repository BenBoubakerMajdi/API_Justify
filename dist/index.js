"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express")); // Import Express and types
const cors_1 = __importDefault(require("cors")); // Import CORS for handling Cross-Origin Resource Sharing
const helmet_1 = __importDefault(require("helmet")); // Import Helmet for security headers
const route_1 = require("./route"); // Import API routes
const dbconfig_1 = __importDefault(require("./DBConfig/dbconfig")); // Import database connection
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express")); //Import of Swagger UI
const swagger_1 = __importDefault(require("./utils/swagger")); // Import of Swagger Configuration file
// Initialize the Express application
exports.app = (0, express_1.default)();
// Connect to the database
(0, dbconfig_1.default)();
// Middleware setup
exports.app.use(express_1.default.json()); // Parse JSON requests
exports.app.use((0, cors_1.default)()); // Enable CORS
exports.app.use((0, helmet_1.default)()); // Secure HTTP headers
exports.app.use(express_1.default.text()); // Parse text/plain requests
// Define API routes
exports.app.use("/api", route_1.apiRouter);
// Set the port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;
exports.app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
// Start the server
exports.app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
