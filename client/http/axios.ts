import { useAuthStore } from "@/hooks/auth-store";
import axios from "axios";

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const api = axios.create({
  baseURL: SERVER_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await api.get("/auth/refresh");
        localStorage.setItem("accessToken", data.accessToken);
        useAuthStore.setState({ isAuth: true });

        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        useAuthStore.setState({ isAuth: false });
      }
    }
    return Promise.reject(error);
  }
);

export default api;
