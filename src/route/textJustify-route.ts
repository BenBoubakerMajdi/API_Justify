import { Router } from "express"
import { verifyToken, checkRateLimit } from "../middelware"
import { justifyTextHandler } from "../contoller/text-justify-controller"

// Exporting justify text route
export const justifyRoute = Router()

// Defining justify text route
justifyRoute.post("/", verifyToken as any, checkRateLimit as any, justifyTextHandler)
