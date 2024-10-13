import { Request } from "express"

export default interface TokenRequest extends Request {
  user: {
    email: string // Define email property in user object
  }
}
