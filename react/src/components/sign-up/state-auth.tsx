import { useAuth } from "@/hooks/use-auth";
import SignUpPage from "./signup-page";
import Verify from "./verify";

const StateAuth = () => {
  const { step } = useAuth();

  return (
    <>
      {step === "login" && <SignUpPage />}
      {step === "verify" && <Verify />}
    </>
  );
};

export default StateAuth;
