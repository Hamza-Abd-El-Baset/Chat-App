import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { CustomError } from "../middlewares/errorHandler.js";
import cloudinary from "../lib/cloudinary.js";

export const updateProfile = asyncHandler(async (req, res) => {

    const {image} = req.body
    const userId = req.user._id

    if(!image) throw new CustomError(400, "Profile pic is required")

    const uploadResponse = await cloudinary.uploader.upload(image)
    const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true})

    res.status(200).json(updatedUser)
})

