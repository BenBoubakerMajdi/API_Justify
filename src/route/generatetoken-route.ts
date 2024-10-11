import { Router } from "express"
import { generateToken } from "../contoller" //Importing generateToken function from the index Controller

//Exporting Token generator Route
export const tokenRoute = Router()

//Defining Token generator Route
tokenRoute.post("/", generateToken)

