import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    users: [],
    messages: [],
    isUsersLoading: false,
    isMessagesLoading: false,
    selectedUser: null,
    isMessageListenerSet: false,

    setSelectedUser: (user) => {
        set({ selectedUser: user });
    },

    getUsers: async () => {
        set({ isUsersLoading: true });
        const token = JSON.parse(localStorage.getItem("userInfo"))?.token
        try {
            const res = await axiosInstance.get("/messages/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const token = JSON.parse(localStorage.getItem("userInfo"))?.token
            const res = await axiosInstance.get(`/messages/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        const token = JSON.parse(localStorage.getItem("userInfo"))?.token
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData, {
                headers: {
                    Authorization: `Bearer ${token}`
            }
        });
            set({messages: [...messages, res.data]});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    subscribeToNewMessages: () => {
        const {socket} = useAuthStore.getState();
        const { selectedUser, isMessageListenerSet } = get()

        if(!selectedUser) return
        if(isMessageListenerSet) return

        socket.on("newMessage", (message) => {
            set({
                messages: [...get().messages, message],
                isMessageListenerSet: true
            })
        })
    },

    unsubscribeFromNewMessages: () => {
        const {socket} = useAuthStore.getState();
        if(socket) socket.off("newMessage")
        set({isMessageListenerSet: false})
    }


}));