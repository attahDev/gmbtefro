import axios from "axios";

export const api = axios.create({
  baseURL: "https://gmbtebac.onrender.com",
  withCredentials: true,
  timeout: 60000,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
