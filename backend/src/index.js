import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./routes/auth.route.js"
import profileRoutes from "./routes/profile.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js"
import errorHandler from "./middlewares/errorHandler.js"

dotenv.config()
const app = express()

const PORT = process.env.PORT

app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use("/api/auth", authRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/message", messageRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
    connectDB()
})