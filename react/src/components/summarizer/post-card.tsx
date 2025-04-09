import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Post } from "@/types";
import api from "@/http/axios";

// Rasmni HTML ichidan ajratish (birinchi <img>)
function extractFirstImage(html: string) {
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}

const PostCard = ({ post }: Post) => {
  const [summary, setSummary] = useState(post.summary || null);
  const [loading, setLoading] = useState(false);
  const [showFull, setShowFull] = useState(false);

  const handleSummarize = async () => {
    try {
      setLoading(true);
      const { data } = await api.post(`/api/posts/${post.id}/summarize`);
      setSummary(data.summary);
      setShowFull(false);
    } catch (err) {
      console.error("Summarize error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setShowFull(true);
  };

  const firstImage = extractFirstImage(post.content);

  return (
    <div className="border p-4 rounded-xl shadow-sm space-y-4">
      <h2 className="text-xl font-semibold">{post.title}</h2>

      {loading ? (
        <Skeleton className="w-full h-20" />
      ) : showFull || !summary ? (
        <>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </>
      ) : (
        <>
          <p className="text-gray-700">{summary}</p>
          {firstImage && (
            <img
              src={firstImage}
              alt="summary image"
              className="rounded-lg mt-2 max-h-64 object-contain"
            />
          )}
        </>
      )}

      <div className="flex gap-2">
        <Button onClick={handleSummarize}>Summarize</Button>
        <Button variant="secondary" onClick={handleReset}>
          Show Full Post
        </Button>
      </div>
    </div>
  );
};

export default PostCard;
