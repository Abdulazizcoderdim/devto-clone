import { useEffect, useState } from "react";
import { Comment, Post, PostTag } from "@/types";
import QuickCreatePost from "./quick-create-post";
import { ItemBlog } from "./item-blog";
import LoadingPost from "@/components/shared/loading-post";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FollowingPosts from "@/components/shared/following-posts";

const Blogs = () => {
  const [pagination, setPagination] = useState({
    number: 1,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });

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
      <QuickCreatePost />

      <div className="w-full mt-2">
        <div className="flex items-center justify-between mb-4">
          <Tabs defaultValue="discover" className="w-full">
            <div className="flex items-center justify-between">
              {/* TabsList ichida Discover va Following */}
              <TabsList className="bg-transparent p-0 space-x-2">
                <TabsTrigger
                  value="discover"
                  className="data-[state=active]:bg-muted rounded-full px-4 py-1 cursor-pointer"
                >
                  Discover
                </TabsTrigger>
                <TabsTrigger
                  value="following"
                  className="data-[state=active]:bg-muted rounded-full px-4 py-1 cursor-pointer"
                >
                  Following
                </TabsTrigger>
              </TabsList>

              {/* Filter menu */}
              {/* <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="ghost"
                    className="cursor-pointer"
                    size="icon"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>Relevant</DropdownMenuItem>
                  <DropdownMenuItem>Top this Week</DropdownMenuItem>
                  <DropdownMenuItem>Top this Month</DropdownMenuItem>
                  <DropdownMenuItem>Top this Year</DropdownMenuItem>
                  <DropdownMenuItem>Top this Infinity</DropdownMenuItem>
                  <DropdownMenuItem>Latest</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
            </div>

            {/* Tabs content */}
            <TabsContent value="discover">
              <div className="flex flex-col gap-3">
                {isLoading && posts.length === 0
                  ? Array.from({ length: 10 }).map((_, i) => (
                      <div key={i}>
                        <LoadingPost />
                      </div>
                    ))
                  : posts.map((post) => {
                      return (
                        <ItemBlog
                          key={post.id}
                          {...formatPostForDisplay(post)}
                        />
                      );
                    })}
              </div>
            </TabsContent>

            <TabsContent value="following">
              <FollowingPosts />
            </TabsContent>
          </Tabs>
        </div>
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
