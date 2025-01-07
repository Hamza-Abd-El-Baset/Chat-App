import express from "express"
import { verifyUser } from "../middlewares/auth.middleware.js"
import { getMessages, getUsersWithChats, sendMessage } from "../controllers/message.controller.js"

const router = express.Router()

router.route("/users", verifyUser)
.get(getUsersWithChats)

router.route("/:id", verifyUser)
.get(getMessages)

router.route("/send/:id", verifyUser)
.post(sendMessage)

export default router