import { create } from "zustand";
import api from "@/http/axios";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuth: boolean;
  loading: boolean;

  setLoading: (loading: boolean) => void;
  setIsAuth: (isAuth: boolean) => void;
  setUser: (user: User) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuth: false,
  loading: false,

  setLoading: (loading) => set({ loading }),
  setIsAuth: (isAuth) => set({ isAuth }),
  setUser: (user) => set({ user }),

  checkAuth: async () => {
    try {
      set({ loading: true });
      const token = localStorage.getItem("accessToken");

      if (!token) return set({ isAuth: false, user: null });

      const { data } = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data) set({ isAuth: true, user: data });
      return data;
    } catch (error) {
      set({ isAuth: false, user: null });
      throw error;
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

      localStorage.removeItem("accessToken");
    } finally {
      set({ isAuth: false, user: null, loading: false });
    }
  },
}));
