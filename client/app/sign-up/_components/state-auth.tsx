import { useAuth } from "@/hooks/use-auth";
import Verify from "./verify";
import SignUp from "./sigin-up";

const StateAuth = () => {
  const { step } = useAuth();

  return (
    <>
      {step === "login" && <SignUp />}
      {step === "verify" && <Verify />}
    </>
  );
};

export default StateAuth;
