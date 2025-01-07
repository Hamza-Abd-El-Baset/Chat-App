import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import { CustomError } from "../middlewares/errorHandler.js"
import { generateToken } from "../lib/utils.js"

export const signup = asyncHandler(async (req, res, next) => {
    const { fullName, email, password } = req.body

    if(!fullName || !email || !password) throw new CustomError(400, "All fields are required")

    if(password.length < 6) throw new CustomError(400, "Password must be at least 6 characters")

    let user = await User.findOne({email})
    if(user) throw new CustomError(400, "Email already exists")

    const hashedPassword = await bcrypt.hash(password, 10)

    user = new User({
        fullName,
        email,
        password: hashedPassword
    })

    generateToken(user._id, res)
    await user.save()

    res.status(200).json(user) 
})

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})

    if(!user) throw new CustomError(400, "Invalid credentials")
    
    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect) throw new CustomError(400, "Invalid credentials")
    
    generateToken(user._id, res)

    res.status(200).json(user)
})

export const logout = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {maxAge:0})
    res.status(200).json({message: "Logged out successfully"})  
})

export const checkAuth = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)  
})


