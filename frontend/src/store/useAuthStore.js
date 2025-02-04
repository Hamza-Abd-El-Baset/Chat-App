import { create } from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],

    signUp: async (formData) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", formData)
            toast.success("Account created successfully")
            set({ authUser: res.data })
        } catch (error) {
            console.log("Error in signUp", error)
            toast.error(error.response?.data?.message || "An error occurred")
        } finally {
            set({ isSigningUp: false })
        }
    },

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check")
            set({ authUser: res.data})
        } catch (error) {
            console.log("Error in checkAuth", error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    login: async (formData) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", formData)
            set({ authUser: res.data })
            toast.success("Logged in successfully")
        } catch (error) {
            console.log("Error in login", error)
            toast.error(error.response?.data?.message || "An error occurred")
        } finally {
            set({ isLoggingIn: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout")
            set({ authUser: null })
        } catch (error) {
            console.log("Error in logout", error)
            toast.error(error.response?.data?.message || "An error occurred")
        }
    },

    updateProfile: async (formData) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put("/profile", formData)
            set({ authUser: res.data })
            toast.success("Profile updated successfully")
        } catch (error) {
            console.log("Error in updateProfile", error)
            toast.error(error.response?.data?.message || "An error occurred")
        } finally {
            set({ isUpdatingProfile: false })
        }
    }
}))


