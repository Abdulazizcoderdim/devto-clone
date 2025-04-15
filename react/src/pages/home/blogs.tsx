import { useEffect, useState } from "react";
import { Comment, Post, PostTag } from "@/types";
import QuickCreatePost from "./quick-create-post";
import { ItemBlog } from "./item-blog";
import LoadingPost from "@/components/shared/loading-post";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const Blogs = () => {
  const [pagination, setPagination] = useState({
    number: 1,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchPosts();
  // }, [pagination.number]);

  // const fetchPosts = async () => {
  //   try {
  //     setLoading(true);
  //     const token = localStorage.getItem("accessToken");
  //     const res = await api.get(
  //       `/posts?page=${pagination.number}&size=${pagination.size}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     setPosts(res.data.content);
  //     setPagination(res.data.page);
  //   } catch (error) {
  //     console.error("Failed to fetch posts", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const { data, error, isLoading } = useSWR(
    `/posts?page=${pagination.number}&size=${pagination.size}`,
    fetcher
  );

  const posts: Post[] = data?.content || [];

  useEffect(() => {
    if (data) {
      setPagination(data.page);
    }
  }, [data]);

  if (error) {
    console.error("Failed to fetch posts", error);
  }

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
      reactions: post._count.reaction,
      comments: formattedComments,
      readingTime,
    };
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <QuickCreatePost />
        {isLoading && posts.length === 0 ? (
          <LoadingPost />
        ) : (
          posts.map((post) => {
            return <ItemBlog key={post.id} {...formatPostForDisplay(post)} />;
          })
        )}
      </div>

      {posts.length === 0 && !isLoading && (
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
