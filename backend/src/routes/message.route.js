import express from "express"
import { verifyUser } from "../middlewares/auth.middleware.js"
import { getMessages, getOtherUsers, sendMessage } from "../controllers/message.controller.js"

const router = express.Router()

router.get("/users", verifyUser, getOtherUsers)

router.get("/:id", verifyUser, getMessages)

router.post("/send/:id", verifyUser, sendMessage)

export default router