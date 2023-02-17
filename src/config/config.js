import { config } from "dotenv"
config()

export const MONGODB_URI = process.env.MONGODB_URI
export const SESSION_KEY = process.env.SESSION_KEY