import LoadingPost from "@/components/shared/loading-post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetcher } from "@/lib/fetcher";
import { Post } from "@/types";
import { format } from "date-fns";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import ThreePanel from "../home/three-panel";
import { readingTime } from "@/lib/reading-time";

const TagPage = () => {
  const [pagination, setPagination] = useState({
    number: 1,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });
  const { tag } = useParams<{ tag: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useSWR(
    `/posts/tags/${tag}?page=${pagination.number}&size=${pagination.size}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setPagination(data.page);
    }
  }, [data]);

  if (error) {
    return <div className="pt-16">Error: {error.message}</div>;
  }

  return (
    <div className="pt-16 container mx-auto px-4">
      <div>
        <h1 className="text-3xl font-bold mb-4">#{tag}</h1>
      </div>
      <div className="flex gap-4 justify-between">
        <div className="w-full flex flex-col gap-4">
          {isLoading ? (
            <LoadingPost className="pt-16 w-full h-72" />
          ) : data.content && data.content.length > 0 ? (
            data.content.map((post: Post, i: number) => {
              return (
                <Card key={i}>
                  <CardContent className="px-6">
                    <div
                      onClick={() =>
                        navigate(`/${post.author.name}/${post.slug}`)
                      }
                      className="cursor-pointer"
                    >
                      {post.coverImageLink && (
                        <img
                          src={post.coverImageLink}
                          alt={post.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Avatar
                        className="h-10 w-10 cursor-pointer"
                        onClick={() => navigate(`/${post.author.name}`)}
                      >
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.author.name}`}
                          alt={post.author.name}
                        />
                        <AvatarFallback>
                          {post.author.name?.charAt(0).toLocaleUpperCase() ||
                            "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p
                          onClick={() => navigate(`/${post.author.name}`)}
                          className="font-medium hover:underline cursor-pointer"
                        >
                          {post.author.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(post.createdAt), "MMMM dd, yyyy")}
                        </p>
                      </div>
                    </div>

                    <Link
                      to={`/${post.author.name}/${post.slug}`}
                      className="text-2xl break-words font-bold mb-3 hover:text-blue-800 transition-colors duration-200"
                    >
                      {post.title}
                    </Link>

                    <div className="flex flex-wrap gap-2 mb-4 mt-2">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag.id}
                          variant="outline"
                          className="text-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                        >
                          <Link to={`/t/${tag.tag.name}`} className="text-sm">
                            #{tag.tag.name}
                          </Link>
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center gap-4">
                        <Button
                          onClick={() =>
                            navigate(`/${post.author.name}/${post.slug}`)
                          }
                          variant="ghost"
                          className="flex items-center gap-2"
                        >
                          <Heart className="h-5 w-5 text-red-500" />
                          <span className="text-sm">
                            {post._count.reaction == 0
                              ? "Add reaction"
                              : post._count.reaction + " Reactions"}
                          </span>
                        </Button>
                        <Button
                          onClick={() =>
                            navigate(
                              `/${post.author.name}/${post.slug}#comments`
                            )
                          }
                          variant="ghost"
                          className="flex items-center gap-2"
                        >
                          <MessageCircle className="h-5 w-5" />
                          <span className="text-sm">
                            {post._count.comments == 0
                              ? "Add comment"
                              : post._count.comments + " Comments"}
                          </span>
                        </Button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {readingTime(post)} read
                        </span>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Bookmark className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="w-full flex justify-center items-center min-h-[60vh]">
              <p>No posts found for tag {tag}</p>
            </div>
          )}
        </div>
        <div className="w-full max-w-sm">
          <ThreePanel />
        </div>
      </div>
    </div>
  );
};

export default TagPage;
