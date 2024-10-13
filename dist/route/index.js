"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const generate_token_route_1 = require("./generate-token-route"); // Adjust import paths as necessary
const text_justify_route_1 = require("./text-justify-route"); // Adjust import paths as necessary
//Exporing all routes in one variable
exports.apiRouter = (0, express_1.Router)();
//Using Token Generator Route
exports.apiRouter.use("/token", generate_token_route_1.tokenRoute);
//Using Justify Text Route
exports.apiRouter.use("/justify", text_justify_route_1.justifyRoute);
/**
 * @swagger
 * /token:
 *   post:
 *     summary: Generate a new token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: A new token has been generated
 *       400:
 *         description: Invalid request body
 */
/**
 * @swagger
 * /justify:
 *   post:
 *     summary: Justify text with the specified default (80 caracters per line)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         required: true
 *         description: The number of characters per line for text justification
 *     requestBody:
 *       required: true
 *       content:
 *         text/plain:
 *           schema:
 *             type: string
 *             example: "Lorem Lorem Lorem Lorem Lorem Lorem Lorem"
 *     responses:
 *       200:
 *         description: Text justified successfully.
 *       400:
 *         description: Missing or invalid text.
 *       401:
 *         description: Unauthorized (missing or invalid token).
 */
