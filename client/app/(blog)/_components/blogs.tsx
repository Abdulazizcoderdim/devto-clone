"use client";

import { useEffect, useState } from "react";
import { ItemBlog } from "./blogs/ItemBlog";
import api from "@/http/axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Post } from "@/types";

const fakeBlogs = [{}];
console.log(fakeBlogs);

const Blogs = () => {
  const [pagination, setPagination] = useState({
    number: 1,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Sample data for demonstration
  const blogPost = {
    author: {
      name: "Anmol Baranwal",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "Mar 24 (4 days ago)",
    title: "10 common backend tasks and how to automate them",
    tags: ["backend", "programming", "javascript", "tutorial"],
    reactions: 236,
    comments: [
      {
        id: "1",
        author: {
          name: "Aavash Parajuli",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Thank you Anmol.",
        date: "1 day ago",
      },
      {
        id: "2",
        author: {
          name: "Zachary Loeber",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Ok, I may have to check out encore now.",
        date: "3 days ago",
      },
    ],
    readingTime: "16 min",
  };

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

  const formatPostForDisplay = (post) => {
    const wordCount = post.content.split(/\s+/).length;
    const readingTime = `${Math.ceil(wordCount / 200)} min`;

    const formattedComments = post.comments.map((comment) => ({
      id: comment.id,
      author: {
        name: comment.user.name,
        avatar: comment.user.image || "/placeholder-avatar.jpg",
      },
      content: comment.content,
      date: new Date(comment.createdAt).toLocaleDateString(),
    }));

    // Extract tag names
    const tagNames = post.tags.map((postTag) => postTag.tag.name);

    return {
      author: {
        name: post.author.name,
        avatar: post.author.image || "/placeholder-avatar.jpg",
      },
      date: new Date(post.createdAt).toLocaleDateString(),
      title: post.title,
      tags: tagNames,
      // reactions: post._count.comments, // Reactions o'rniga comment count'ni ishlatamiz
      comments: formattedComments,
      readingTime,
    };
  };

  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin" size="lg" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {posts.map((post) => {
          return (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <ItemBlog {...formatPostForDisplay(post)} />
            </Link>
          );
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
