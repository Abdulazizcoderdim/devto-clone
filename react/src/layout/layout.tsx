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
    </AuthProvider>
  );
};

export default Layout;
