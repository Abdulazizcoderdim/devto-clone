"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import api from "@/http/axios";
import { useAuthStore } from "@/hooks/auth-store";
import { useRouter } from "next/navigation";

const Header = () => {
  const token = localStorage.getItem("accessToken");
  const { isAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { data } = await api.delete("/auth/logout", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("accessToken");
      toast.success(data.message || "Deleted");
      router.push("/auth");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left section with logo */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <Image
                width={48}
                height={32}
                src="/logo.png"
                alt="DEV Community"
                className="h-8 w-12"
              />
            </Link>

            <div className="flex-1 max-w-xl">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-gray-300 transition-colors"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Second section with buttons */}
          {!isAuth && (
            <Button variant={"default"} asChild>
              <Link href={"/auth"}>Log in</Link>
            </Button>
          )}
          {/* logout */}
          {isAuth && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <p className="text-red-500">Logout</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
