import { Router } from "express"
import { verifyToken, checkRateLimit } from "../middleware"
import { justifyTextHandler } from "../contoller"

// Exporting justify text route
export const justifyRoute = Router()

// Defining justify text route
justifyRoute.post("/", verifyToken as any, checkRateLimit as any, justifyTextHandler)


