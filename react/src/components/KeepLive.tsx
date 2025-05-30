import api from "@/http/axios";
import { useEffect } from "react";

const KeepAlive = () => {
  useEffect(() => {
    const pingServer = async () => {
      try {
        await api.get("/health");
        console.log("Server alive ping sent.");
      } catch (error) {
        console.error("Ping failed:", error);
      }
    };

    const interval = setInterval(pingServer, 5 * 60 * 1000);

    pingServer();

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default KeepAlive;
