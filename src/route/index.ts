import { Router } from "express"
import { tokenRoute } from "./generatetoken-route" // Adjust import paths as necessary
import { justifyRoute } from "./textJustify-route" // Adjust import paths as necessary

//Exporing all routes in one variable
export const apiRouter = Router()

//Using Token Generator Route
apiRouter.use("/token", tokenRoute)
//Using Justify Text Route
apiRouter.use("/justify", justifyRoute)

