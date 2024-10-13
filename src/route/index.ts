import { Router } from "express"
import { tokenRoute } from "./generate-token-route" // Adjust import paths as necessary
import { justifyRoute } from "./text-justify-route" // Adjust import paths as necessary

//Exporing all routes in one variable
export const apiRouter = Router()

//Using Token Generator Route
apiRouter.use("/token", tokenRoute)
//Using Justify Text Route
apiRouter.use("/justify", justifyRoute)

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


