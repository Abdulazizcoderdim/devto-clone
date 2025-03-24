import { api } from "@/http/axios";
import { useState } from "react";

const Summarizer = ({ articleText }: { articleText: string }) => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const getSummary = async () => {
    setLoading(true);
    try {
      const response = await api.post("/summarize", {
        text: articleText,
      });
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Xulosa yaratishda xatolik:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={getSummary}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Xulosa yaratilmoqda..." : "Xulosa yaratish"}
      </button>
      {summary && <p className="mt-4 p-2 bg-gray-100">{summary}</p>}
    </div>
  );
};

export default Summarizer;
