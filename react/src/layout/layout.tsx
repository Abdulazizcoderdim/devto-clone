import KeepAlive from "@/components/KeepLive";
import Header from "@/components/shared/header";
import AuthProvider from "@/provider/auth-provider";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <AuthProvider>
      <main>
        <Header />
        <Outlet />
      </main>
      <Toaster />
      <KeepAlive />
    </AuthProvider>
  );
};

export default Layout;
