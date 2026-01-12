import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URI,
});

export const getBlogs = () => API.get("/api/blogs");

export const getBlogById = (id) => API.get(`/api/blogs/${id}`);

export const createBlog = (formData) =>
  API.post("/api/blogs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateBlog = (id, formData) =>
  API.put(`/api/blogs/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteBlog = (id) =>
  API.delete(`/api/blogs/${id}`);
