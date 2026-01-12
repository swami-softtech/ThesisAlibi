import { API_URL } from "./api";

export const getPackages = async () => {
  const res = await fetch(`${API_URL}/api/packages`);
  return res.json();
};

export const createPackage = async (data) => {
  const res = await fetch(`${API_URL}/api/packages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updatePackage = async (id, data) => {
  const res = await fetch(`${API_URL}/api/packages/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deletePackage = async (id) => {
  return fetch(`${API_URL}/api/packages/${id}`, {
    method: "DELETE",
  });
};
