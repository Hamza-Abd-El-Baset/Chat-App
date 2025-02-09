import { create } from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"
import { io } from "socket.io-client"

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,

    signUp: async (formData) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", formData)
            toast.success("Account created successfully")
            set({ authUser: res.data.user })
            localStorage.setItem("userInfo", JSON.stringify(res.data))
            get().connectSocket()
        } catch (error) {
            console.log("Error in signUp", error)
            toast.error(error.response?.data?.message || "An error occurred")
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (formData) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", formData)
            set({ authUser: res.data.user })
            localStorage.setItem("userInfo", JSON.stringify(res.data))
            toast.success("Logged in successfully")
            get().connectSocket()
        } catch (error) {
            console.log("Error in login", error)
            toast.error(error.response?.data?.message || "An error occurred")
        } finally {
            set({ isLoggingIn: false })
        }
    },

    logout: async () => {
        try {
            set({ authUser: null })
            localStorage.removeItem("userInfo")
            get().disconnectSocket()
        } catch (error) {
            console.log("Error in logout", error)
            toast.error(error.response?.data?.message || "An error occurred")
        }
    },

    checkAuth: () => {
        const userInfo = localStorage.getItem("userInfo")
        if(userInfo) {
            set({ authUser: JSON.parse(userInfo).user })
        }
        get().connectSocket()
    },

    updateProfile: async (formData) => {
        set({ isUpdatingProfile: true })
        const token = JSON.parse(localStorage.getItem("userInfo"))?.token
        try {
            const res = await axiosInstance.put("/profile", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            set({ authUser: res.data })
            toast.success("Profile updated successfully")
        } catch (error) {
            console.log("Error in updateProfile", error)
            toast.error(error.response?.data?.message || "An error occurred")
        } finally {
            set({ isUpdatingProfile: false })
        }
    },

    connectSocket: () => {
        const { authUser } = get()
        if(!authUser || get().socket?.connected) return
        
        const socket = io(API_DOMAIN, {
            query: {
                userId: authUser._id
            },
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5
        })

        socket.on("connect", () => {
            set({ socket })
            console.log("connected to socket", socket.id)
        })

        socket.on("onlineUsersChanged", (onlineUsers) => {
            set({ onlineUsers })
        })

        socket.on("connect_error", (error) => {
            console.error("Socket connection error:", error)
            toast.error("Connection error. Retrying")
        })

        socket.on("disconnect", (reason) => {
            console.log("socket disconnected:", reason)
            if(reason === "io server disconnect") socket.connect()
        })

    },

    disconnectSocket: () => {
        if(get().socket?.connected) {
            get().socket.disconnect()
            set({ socket: null })
        }
    }
}))


