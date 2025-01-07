import express from "express"
import { updateProfile } from "../controllers/profile.controller.js"
import { verifyUser } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.put("/", verifyUser, updateProfile)

export default router