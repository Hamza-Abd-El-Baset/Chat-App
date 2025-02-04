import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { v2 as cloudinary } from "cloudinary"
import asyncHandler from "express-async-handler"

export const getOtherUsers = asyncHandler(async (req, res) => {
    const loggedInUserId = req.user._id
    const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password")
    res.status(200).json(filteredUsers) 
})

export const getMessages = asyncHandler(async (req, res) => {
    const {id: userToChatId} = req.params
    const loggedInUserId = req.user._id
    const messages = await Message.find({$or: [
        {senderId: loggedInUserId, receiverId: userToChatId},
        {senderId: userToChatId, receiverId: loggedInUserId}
    ]})

    res.status(200).json(messages)
})

export const sendMessage = asyncHandler(async (req, res) => {
    const { text, image } = req.body
    const { id: receiverId } = req.params
    const senderId = req.user._id
    console.log("req", req)
    let imageUrl

    if(image) {
        const uploadResponse = await cloudinary.uploader.upload(image)
        imageUrl = uploadResponse.secure_url
    }

    const message = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl
    })

    await message.save()

    // @todo: realtime functionality goes here => socket.io

    res.status(201).json(message)
})
