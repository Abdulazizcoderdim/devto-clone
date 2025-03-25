"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import api from "@/http/axios";
import { FileLock, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setEmail, setStep } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.post("/auth/login", formData);
      if (!data) {
        throw new Error("Login xatolik");
      }

      setEmail(data.email);
      setStep("verify");

      toast.success("Tasdiqlash kodi emailingizga yuborildi.");
      return data;
    } catch (error) {
      // @ts-ignore
      toast.error(error.response.data.message + " 😢" || "Login xatolik");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-2xl">
      <div>
        <h2 className="mt-6 text-center text-4xl font-bold text-gray-900 tracking-tight">
          Sign in to DevTo
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-5">
          <div className="relative">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email address
            </Label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="pl-10 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-400 transition-colors duration-200"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="relative">
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </Label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileLock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="pl-10 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-400 transition-colors duration-200"
                placeholder="Enter your password"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label
            htmlFor="remember-me"
            className="ml-2 gap-2 select-none text-sm text-gray-900 flex items-center"
          >
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            Remember me
          </label>
        </div>

        <Button
          disabled={loading}
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          {loading ? "Loading..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
