"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc")); // Import Swagger JSDoc for generating Swagger API documentation
require("dotenv/config"); // Loading environment variables
// Defining the Swagger options
const options = {
    definition: {
        openapi: "3.0.0", // Defining the OpenAPI version
        info: {
            title: "Text Justify API", // Defining the title of the API
            version: "1.0.0", // Specifying the version of the API
            description: "API documentation Text Justify API", // Providing a brief description of the API
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`, // Defining the server URL with the environment port
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http", // Defining the type of security scheme
                    scheme: "bearer", // Defining the authentication scheme as bearer
                    bearerFormat: "JWT", // Specifying the bearer token format as JWT
                },
            },
        },
    },
    apis: [
        "../../src/route/index.ts", // Including the API route definition
        "../../src/route/*.ts", // Including all route files for API documentation
        "../../src/controller/*.ts", // Including all controller files for API documentation
    ],
};
// Generating Swagger documentation using the defined options
const Specs = (0, swagger_jsdoc_1.default)(options);
exports.default = Specs; // Exporting the generated Swagger specification
