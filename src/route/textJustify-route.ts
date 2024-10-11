import { Router } from "express"
import { verifyToken } from "../middelware/isauthenticated-middleware"
import { justifyTextHandler } from "../contoller/text-justify-controller"

//exporting justify Text Route
export const justifyRoute = Router()

//Defining justify Text Route
justifyRoute.post("/", verifyToken, justifyTextHandler)
