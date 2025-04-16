import { useParams } from "react-router-dom";
import LikesPost from "./likes-post";
import ReadPost from "./read-post";
import PostAuthor from "./post-author";
import { useEffect, useState } from "react";
import { Post } from "@/types";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const SlugPost = () => {
  const [post, setPost] = useState<Post | null>(null);

  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, error, mutate } = useSWR(`/posts/${slug}`, fetcher);

  useEffect(() => {
    if (data) {
      setPost(data);
    }
  }, [data]);

  if (error) {
    console.error("Failed to fetch post", error);
    return <div className="pt-20 text-center">Failed to fetch post</div>;
  }

  // useEffect(() => {
  //   fetchPost();
  // }, [slug]);

  // const fetchPost = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await api.get(`/posts/${slug}`);
  //     setPost(res.data);
  //   } catch (error) {
  //     console.error("Failed to fetch post", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="pt-16 min-h-screen container mx-auto px-4">
      <div className="flex justify-between gap-4">
        <div className="flex gap-5 w-full">
          <div className="fixed md:h-screen max-md:z-50 max-md:bg-white max-md:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)] max-md:bottom-0 max-md:left-0 max-md:right-0 md:max-w-24 w-full p-4">
            <LikesPost mutate={mutate} postId={post?.id || ""} />
          </div>
          <div className="flex gap-5 w-full md:ml-24 max-md:mb-24 max-w-[870px] break-words">
            <ReadPost post={post} setPost={setPost} loading={isLoading} />
          </div>
        </div>

        <PostAuthor loading={isLoading} post={post} />
      </div>
    </div>
  );
};

export default SlugPost;
