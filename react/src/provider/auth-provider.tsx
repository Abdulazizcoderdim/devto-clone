import { useAuthStore } from "@/hooks/auth-store";
import api from "@/http/axios";
import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect, useCallback } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { checkAuth, logout, setIsAuth, setLoading } = useAuthStore();
  const navigate = useNavigate();

  const refreshToken = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/auth/refresh");
      if (!data?.accessToken) throw new Error("No access token");

      localStorage.setItem("accessToken", data.accessToken);
      setIsAuth(true);
      return data.accessToken;
    } catch {
      logout();
      navigate("/sign-in");
      localStorage.removeItem("accessToken");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth();
      } catch {
        await refreshToken();
      }
    };

    verifyAuth();

    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const interval = setInterval(refreshToken, 3600000); // 1 hour
    return () => clearInterval(interval);
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
