import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/hooks/auth-store";
import StateAuth from "@/components/sign-up/state-auth";

const SignUp = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuthStore();

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth, navigate]);

  return (
    <div className="container max-w-md w-full h-screen flex justify-center items-center flex-col space-y-4">
      <img
        width={120}
        height={120}
        alt="logo"
        src="/logo.png"
        className="h-30 w-30"
      />
      <StateAuth />
      {/* <Social /> */}
    </div>
  );
};

export default SignUp;
