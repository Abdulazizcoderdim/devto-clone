import { useAuth } from "@/hooks/use-auth";
import { api } from "@/http/axios";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { setIsAuth, setLoading, setUser } = useAuth();

  const checkAuth = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/auth/refresh"); // 🔥 Cookie orqali so‘rov
      localStorage.setItem("accessToken", data.accessToken);
      setIsAuth(true);
      setUser(data.user);
    } catch (error) {
      console.error(error);
      localStorage.removeItem("accessToken");
    } finally {
      setLoading(false);
    }
  };

  // Browser yangilansa yoki sahifa ochilganda tokenni tekshirish
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      checkAuth();
    }
  }, []);

  return <div>ProtectedRoute</div>;
};

export default ProtectedRoute;
