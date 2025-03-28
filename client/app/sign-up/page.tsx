"use client";

import Image from "next/image";
import StateAuth from "./_components/state-auth";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthStore } from "@/hooks/auth-store";

const Page = () => {
  const { isAuth } = useAuthStore();

  useEffect(() => {
    if (isAuth) redirect("/");
  }, []);

  return (
    <div className="container max-w-md w-full h-screen flex justify-center items-center flex-col space-y-4">
      <Image
        width={"120"}
        height={"120"}
        alt="logo"
        sizes="120"
        src={"/logo.png"}
      />
      <StateAuth />
      {/* <Social /> */}
    </div>
  );
};

export default Page;
