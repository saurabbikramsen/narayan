import dotenv from "dotenv"

dotenv.config()

export const port = process.env.PORT
export const mongoUri = process.env.MONGOURI || "mongodb://localhost:27017/"

