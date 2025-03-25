import api from "@/http/axios";
import { create } from "zustand";

interface AuthState {
  user: any | null;
  isAuth: boolean;
  accessToken: string | null;
  loading: boolean;
  checkAuth: () => void;
  setUser: (user: any) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: localStorage.getItem("accessToken") || null,
  isAuth: !!localStorage.getItem("accessToken"),
  loading: false,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),

  checkAuth: async () => {
    try {
      const { data } = await api.get("/auth/refresh");
      set({ accessToken: data.accessToken, isAuth: true });
      localStorage.setItem("accessToken", data.accessToken);
    } catch {
      set({ isAuth: false });
    } finally {
      set({ loading: false });
    }
  },
}));
