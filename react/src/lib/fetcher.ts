import api from "@/http/axios";

export const fetcher = async (url: string, params: any) => {
  const token = localStorage.getItem("accessToken");
  const res = await api.get(url, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });
  return res.data;
};
