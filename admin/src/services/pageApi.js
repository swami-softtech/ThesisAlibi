import axios from "axios";
import { API_URL } from "./api";

const API = axios.create({
  baseURL: `${API_URL}/api/pages`,
});

export const getAllPages = () => API.get("/");
export const getPageByType = (type) => API.get(`/${type}`);
export const savePage = (data) => API.post("/", data);
export const deletePage = (type) => API.delete(`/${type}`);
