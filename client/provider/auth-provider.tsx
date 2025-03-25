"use client";

import { useAuthStore } from "@/hooks/auth-store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error("Auth check failed:", error);
        logout(); // 🔥 Avtorizatsiya yo‘q bo‘lsa, foydalanuvchini chiqaramiz
        router.push("/auth"); // 🔥 Foydalanuvchini /auth sahifasiga yuboramiz
      }
    };

    verifyAuth();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
