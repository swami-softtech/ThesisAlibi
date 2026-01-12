
import axios from "axios";
import { API_URL } from "./api";

export const createProfile = async (data) => {
    return axios.post(`${API_URL}/api/user/profile`, data);
};
