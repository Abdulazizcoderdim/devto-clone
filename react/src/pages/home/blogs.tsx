import { useEffect, useState } from "react";
import api from "@/http/axios";
import { Loader2 } from "lucide-react";
import { Comment, Post, PostTag } from "@/types";
import QuickCreatePost from "./quick-create-post";
import { ItemBlog } from "./item-blog";

const Blogs = () => {
  const [pagination, setPagination] = useState({
    number: 1,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [pagination.number]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const res = await api.get(
        `/posts?page=${pagination.number}&size=${pagination.size}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts(res.data.content);
      setPagination(res.data.page);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPostForDisplay = (post: Post) => {
    const wordCount = post.content.split(/\s+/).length;
    const readingTime = `${Math.ceil(wordCount / 200)} min`;

    const formattedComments = post.comments.map((comment: Comment) => ({
      id: comment.id,
      author: {
        name: comment.user.name ?? "",
      },
      content: comment.text,
      date: new Date(comment.createdAt).toLocaleDateString(),
    }));

    // Extract tag names
    const tagNames = post.tags.map((postTag: PostTag) => postTag.tag.name);

    return {
      id: post.id,
      slug: post.slug,
      author: {
        name: post.author.name,
      },
      coverImageLink: post.coverImageLink,
      date: new Date(post.createdAt).toLocaleDateString(),
      title: post.title,
      tags: tagNames,
      reactions: 2, // Reactions o'rniga comment count'ni ishlatamiz
      comments: formattedComments,
      readingTime,
    };
  };

  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin" size={24} />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <QuickCreatePost />
        {posts.map((post) => {
          return <ItemBlog key={post.id} {...formatPostForDisplay(post)} />;
        })}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            Hozircha postlar mavjud emas
          </p>
        </div>
      )}
    </>
  );
};

export default Blogs;
