"use client";

import { useEffect, useState } from "react";
import { ItemBlog } from "./blogs/ItemBlog";
import api from "@/http/axios";

const fakeBlogs = [{}];
console.log(fakeBlogs);

const Blogs = () => {
  const [pagination, setPagination] = useState({
    number: 1,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });
  const [posts, setPosts] = useState([]);

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
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <ItemBlog {...blogPost} />
    </div>
  );
};

export default Blogs;
