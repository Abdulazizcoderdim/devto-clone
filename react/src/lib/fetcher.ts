import api from "@/http/axios";

export const fetcher = async (url: string) => {
  const token = localStorage.getItem("accessToken");
  const res = await api.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
