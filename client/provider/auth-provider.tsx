"use client";

import { useAuthStore } from "@/hooks/auth-store";
import api from "@/http/axios";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const { setAccessToken, setIsAuth } = useAuthStore();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error("Auth check failed:", error);
        logout();
        router.push("/sign-in");
      }
    };

    if (localStorage.getItem("accessToken")) {
      refreshToken();

      const interval = setInterval(() => {
        refreshToken();
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    }

    verifyAuth();
  }, []);

  const refreshToken = async () => {
    try {
      const { data } = await api.get("/auth/refresh");
      setAccessToken(data.accessToken);
      setIsAuth(true);
      localStorage.setItem("accessToken", data.accessToken);
    } catch (error) {
      console.error("Refresh token failed:", error);
      logout();
      router.push("/sign-in");
    }
  };

  return <>{children}</>;
};

export default AuthProvider;
