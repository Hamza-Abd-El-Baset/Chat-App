import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})

const userSocketMap = {}

io.on("connection", (socket) => {
    console.log("a user connected", socket.id)
    const { userId } = socket.handshake.query
    if(!userSocketMap[userId]) userSocketMap[userId] = [socket.id]
    else userSocketMap[userId].push(socket.id)
    socket.join(userId)

    io.emit("onlineUsersChanged", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        console.log("a user disconnected", socket.id)
        userSocketMap[userId].splice(userSocketMap[userId].indexOf(socket.id), 1)
        if(userSocketMap[userId].length === 0) delete userSocketMap[userId]
        
        io.emit("onlineUsersChanged", Object.keys(userSocketMap))
    })
    

})


export {io, app, server}