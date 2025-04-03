import api from "@/http/axios";
import { User } from "@/types";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isAuth: boolean;
  accessToken: string | null;
  loading: boolean;
  setIsAuth: (isAuth: boolean) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  setAccessToken: (token: string) => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: localStorage.getItem("accessToken"),
  isAuth: false,
  loading: false,

  setIsAuth: (isAuth) => set({ isAuth }),
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setAccessToken: (token) => set({ accessToken: token }),

  checkAuth: async () => {
    try {
      set({ loading: true });
      const token = localStorage.getItem("accessToken");

      if (!token) {
        set({ isAuth: false, user: null });
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
      set({ isAuth: false, user: null });
      throw error; // Xatoni yuqoriga qaytaramiz
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      set({ loading: true });
      const token = localStorage.getItem("accessToken");

      if (token) {
        await api.delete("/auth/logout", {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
      }
      set({ accessToken: null, isAuth: false, user: null });

      // Router orqali yo'naltirish
      if (typeof window !== "undefined") {
        window.location.href = "/sign-in";
      }
    }
  },
}));
