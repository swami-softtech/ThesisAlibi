// src/api/aboutSection.api.js
import axios from "axios";
import { API_URL } from "./api";

const API = axios.create({
    baseURL: `${API_URL}/api/about`,
});

export const fetchAbout = () => API.get("/");
export const createAbout = (data) => API.post("/", data);
export const updateAbout = (id, data) => API.put(`/${id}`, data);
export const deleteAbout = (id) => API.delete(`/${id}`);
