import axios from "axios";
import { API_URL } from "./api";

const API = axios.create({
    baseURL: `${API_URL}/api/auth`
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export const registerUser = (data) => API.post("/register", data);
export const verifyOtp = (data) => API.post("/verify-otp", data);
export const createPassword = (data) => API.post("/create-password", data);
export const loginUser = (data) => API.post("/login", data);
export const forgotPassword = (data) => API.post("/forgot-password", data);
export const resetPassword = (data) => API.post("/reset-password", data);
export const resendOtp = (data) => API.post("/resend-otp", data);
