import axios from "axios";
import { API_URL } from "./api";

export const getAboutSections = () =>
    axios.get(`${API_URL}/api/about`);

export const getAboutSectionById = (id) =>
    axios.get(`${API_URL}/api/about/${id}`);

export const createAboutSection = (data) =>
    axios.post(`${API_URL}/api/about`, data);

export const updateAboutSection = (id, data) =>
    axios.put(`${API_URL}/api/about/${id}`, data);

export const deleteAboutSection = (id) =>
    axios.delete(`${API_URL}/api/about/${id}`);
