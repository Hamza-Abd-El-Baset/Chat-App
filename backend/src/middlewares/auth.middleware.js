import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import asyncHandler from "express-async-handler"
import { CustomError } from "./errorHandler.js"

export const verifyUser = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt
    if(!token) throw new CustomError(401, "Unauthorized - No token provided")
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET)
    if(!decodedPayload) throw new CustomError(401, "Unauthorized - Invalid Token")
    
    const {userId} = decodedPayload
    const user = await User.findById(userId).select("-password")

    if(!user) throw new CustomError(404, "User no found")

    req.user = user

    next()
})