"use client";

import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import StateAuth from "./_components/state-auth";
import Social from "./_components/social";

const Page = () => {
  const token = localStorage.getItem("accessToken");

  //   useEffect(() => {
  //     if (!token) redirect("/");
  //   }, []);

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
      <Social />
    </div>
  );
};

export default Page;
