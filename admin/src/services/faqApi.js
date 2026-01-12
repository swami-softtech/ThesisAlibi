import axios from "axios";
import { API_URL } from "./api";

const API = `${API_URL}/api/faqs`;

export const getFaqs = () => axios.get(API);
export const createFaq = (data) => axios.post(API, data);
export const updateFaq = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteFaq = (id) => axios.delete(`${API}/${id}`);
