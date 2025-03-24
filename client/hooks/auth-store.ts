import { create } from "zustand";

interface AuthState {
  user: any | null;
  isAuth: boolean;
  loading: boolean;
  setUser: (user: any) => void;
  setIsAuth: (isAuth: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuth: false,
  loading: false,

  setUser: (user) => set({ user }),
  setIsAuth: (isAuth) => set({ isAuth }),
  setLoading: (loading) => set({ loading }),
}));
