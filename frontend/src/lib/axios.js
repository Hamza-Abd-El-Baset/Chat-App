import axios from "axios";

const API_DOMAIN = import.meta.env.VITE_MODE === 'development' ? import.meta.env.VITE_API_DOMAIN : ""

export const axiosInstance = axios.create({
    baseURL: `${API_DOMAIN}/api`
})
