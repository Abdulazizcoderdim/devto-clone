import api from "@/http/axios";
import { create } from "zustand";

interface AuthState {
  user: any | null;
  isAuth: boolean;
  accessToken: string | null;
  loading: boolean;
  setIsAuth: (isAuth: boolean) => void;
  checkAuth: () => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
  setUser: (user: any) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: localStorage.getItem("accessToken") || null,
  isAuth: !!localStorage.getItem("accessToken"),
  loading: false,

  setIsAuth: (isAuth) => set({ isAuth }),
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setAccessToken: (token) => set({ accessToken: token }),
  checkAuth: async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        set({ isAuth: false });
        return;
      }

      const { data } = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data) {
        set({ accessToken: token, isAuth: true, user: data });
      }
    } catch (error) {
      console.error("Auth check failed:", error);

      // Faqat refresh tokenni ishga tushirish:
      try {
        const { data } = await api.get("/auth/refresh");
        console.log("Refresh token data:", data);
        set({ accessToken: data.accessToken, isAuth: true });
        localStorage.setItem("accessToken", data.accessToken);
      } catch {
        useAuthStore.setState({ accessToken: null, isAuth: false }); // 🔥 Oldin false qilib qo'yish kerak
        localStorage.removeItem("accessToken");
      }
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (token) {
        await api.delete("/auth/logout", {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      localStorage.removeItem("accessToken");
      useAuthStore.setState({ accessToken: null, isAuth: false });
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      localStorage.removeItem("accessToken");
      useAuthStore.setState({ accessToken: null, isAuth: false });
      window.location.href = "/sign-in"; // 🔥 Foydalanuvchini /auth pagega yuborish
    }
  },
}));
