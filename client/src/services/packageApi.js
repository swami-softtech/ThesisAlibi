const API_URL = import.meta.env.VITE_BASE_URI;

export const fetchPackages = async () => {
  const response = await fetch(`${API_URL}/api/packages`);

  if (!response.ok) {
    throw new Error("Failed to fetch packages");
  }

  return response.json();
};
