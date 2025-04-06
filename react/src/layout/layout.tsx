import Header from "@/components/shared/header";
import AuthProvider from "@/provider/auth-provider";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <AuthProvider>
      <main>
        <Header />
        <Outlet />
      </main>
    </AuthProvider>
  );
};

export default Layout;
