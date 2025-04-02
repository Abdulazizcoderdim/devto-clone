"use client";

import { useAuthStore } from "@/hooks/auth-store";
import api from "@/http/axios";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useCallback } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { checkAuth, logout, setAccessToken, setIsAuth } = useAuthStore();
  const router = useRouter();

  const refreshToken = useCallback(async () => {
    try {
      const { data } = await api.get("/auth/refresh");

      if (!data?.accessToken) {
        logout(); // Token o'chirilsa ham logout qilish kerak
        router.push("/login");
        throw new Error("No access token received!");
      }

      setAccessToken(data.accessToken);
      localStorage.setItem("accessToken", data.accessToken);
      setIsAuth(true);

      return data.accessToken;
    } catch (error) {
      console.error("Refresh token failed:", error);
      logout();
      router.push("/login");
      return null;
    }
  }, [setAccessToken, setIsAuth, logout, router]);

  const verifyAuth = useCallback(async () => {
    try {
      await checkAuth();
    } catch (error) {
      console.error("Auth check failed:", error);
      await refreshToken();
    }
  }, [checkAuth, refreshToken]);

  useEffect(() => {
    verifyAuth();

    const token = localStorage.getItem("accessToken");

    if (token) {
      refreshToken();

      const interval = setInterval(() => {
        refreshToken();
      }, 3600000); // 1 soat

      return () => clearInterval(interval);
    }
  }, [verifyAuth, refreshToken]);

  return <>{children}</>;
};

export default AuthProvider;
