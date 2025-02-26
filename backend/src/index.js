import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./routes/auth.route.js"
import profileRoutes from "./routes/profile.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js"
import errorHandler from "./middlewares/errorHandler.js"
import { app, server } from "./lib/socket.js"
import path from "path"

dotenv.config()

const PORT = process.env.PORT
const __dirname = path.resolve()


app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use("/api/auth", authRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/messages", messageRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

app.use(errorHandler)

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
    connectDB()
})

if(process.env.NODE_ENV === "production"){
    // Self Ping to keep the server awake
    const serverUrl = process.env.SERVER_URL;

    setInterval(() => {
        fetch(`${serverUrl}/`)
            .then(res => res.text())
            .then(console.log("Self-ping successful"))
            .catch(err => console.error("Self-ping failed:", err));
    }, 10 * 60 * 1000); // 10 minutes
}