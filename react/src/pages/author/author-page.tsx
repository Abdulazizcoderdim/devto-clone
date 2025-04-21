import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Bookmark,
  BookmarkIcon,
  Calendar,
  ExternalLink,
  Github,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Twitter,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Post } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingPost from "@/components/shared/loading-post";
import FollowButton from "@/components/shared/follow-button";
import { useAuthStore } from "@/hooks/auth-store";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { readingTime } from "@/lib/reading-time";

// interface ApiPost {
//   posts: Post[];
//   id: string;
//   createdAt: string;
//   followers: number;
//   following: number;
//   page: {
//     number: number;
//     size: number;
//     totalElements: number;
//     totalPages: number;
//   };
// }

const AuthorPage = () => {
  // const [user, setUser] = useState<{
  //   id: string;
  //   createdAt: string;
  //   followers: number;
  //   following: number;
  // } | null>(null);
  const { author } = useParams();
  const navigate = useNavigate();
  // const [userPosts, setUserPosts] = useState<Post[]>([]);
  // const [loading, setLoading] = useState(false);
  const { user: currentUser } = useAuthStore();
  const [pagination, setPagination] = useState({
    number: 1,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });

  // useEffect(() => {
  //   fetchUserPosts();
  // }, [pagination.number]);

  // const fetchUserPosts = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await api.get<ApiPost>(
  //       `/users/${author}?page=${pagination?.number}&size=${pagination?.size}`
  //     );

  //     if (!res.data) {
  //       throw new Error("User not found");
  //     }

  //     setUser({
  //       id: res.data.id,
  //       createdAt: res.data.createdAt,
  //       followers: res.data.followers,
  //       following: res.data.following,
  //     });
  //     setPagination(res.data.page);
  //     setUserPosts(res.data.posts);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const { data, isLoading, error } = useSWR(
    author
      ? `/users/${author}?page=${pagination.number}&size=${pagination.size}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setPagination(data.page);
    }
  }, [data]);

  const user = data
    ? {
        id: data.id,
        createdAt: data.createdAt,
        followers: data.followers,
        following: data.following,
      }
    : null;

  const posts: Post[] = data ? data.posts : [];

  if (error) {
    console.error(error);
  }

  return (
    <div className="flex min-h-screen pt-14 flex-col bg-gray-50 dark:bg-gray-900">
      {/* Main content */}
      <div className="mx-auto w-full max-w-4xl px-4 py-4">
        {/* Profile card */}
        <Card className="mb-6 overflow-hidden border-0 shadow-sm">
          <CardHeader className="flex flex-col items-center justify-center space-y-2 px-6 py-4 text-center">
            <Avatar className="h-20 bg-red-200 w-20  rounded-md">
              <AvatarImage
                className="w-full h-full"
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${author}`}
              />
              <AvatarFallback>{author?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-4xl font-bold">{author}</CardTitle>
            <CardDescription className="max-w-2xl text-center text-base"></CardDescription>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {user ? (
                  format(new Date(user.createdAt), "MMM dd, yyyy")
                ) : (
                  <Skeleton className="h-4 w-16" />
                )}
              </span>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Link
                to="#"
                className="inline-flex items-center gap-1 hover:text-foreground"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                to="#"
                className="inline-flex items-center gap-1 hover:text-foreground"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link
                to="#"
                className="inline-flex items-center gap-1 hover:text-foreground"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </CardHeader>
          <CardFooter className="flex justify-center pb-6">
            {user?.id && currentUser?.id !== user?.id && (
              <FollowButton userId={user?.id} />
            )}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom">
                <DropdownMenuItem>Share profile</DropdownMenuItem>
                <DropdownMenuItem>Report</DropdownMenuItem>
                <DropdownMenuItem>Block @{author}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>

        {/* Two column layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Left sidebar */}
          <div className="space-y-6">
            {/* Meet the team card */}
            {/* <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Meet the team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex -space-x-2">
                  <Avatar className="border-2 border-background">
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Team member"
                    />
                    <AvatarFallback>TM</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background">
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Team member"
                    />
                    <AvatarFallback>TM</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card> */}

            {/* Stats card */}
            <Card>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <BookmarkIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {posts.length} posts published
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{user?.followers} members</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{user?.following} following</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content - posts */}
          <div className="space-y-6 md:col-span-2">
            {isLoading ? (
              <LoadingPost />
            ) : posts.length === 0 ? (
              <p className="text-muted-foreground text-center">No posts</p>
            ) : (
              posts.map((post, i) => {
                return (
                  <Card key={i}>
                    <CardContent className="px-6">
                      <div
                        onClick={() => navigate(`/${author}/${post.slug}`)}
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
                          onClick={() => navigate(`/${author}`)}
                        >
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${author}`}
                            alt={author}
                          />
                          <AvatarFallback>
                            {author?.charAt(0).toLocaleUpperCase() || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p
                            onClick={() => navigate(`/${author}`)}
                            className="font-medium hover:underline cursor-pointer"
                          >
                            {author}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(post.createdAt), "MMMM dd, yyyy")}
                          </p>
                        </div>
                      </div>

                      <Link
                        to={`/${author}/${post.slug}`}
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
                            onClick={() => navigate(`/${author}/${post.slug}`)}
                            variant="ghost"
                            className="flex items-center gap-2"
                          >
                            <Heart className="h-5 w-5 text-red-500" />
                            <span className="text-sm">
                              {post._count.reaction} Reactions
                            </span>
                          </Button>
                          <Button
                            onClick={() =>
                              navigate(`/${author}/${post.slug}#comments`)
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
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Bookmark className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}

            {/* <Button className="cursor-pointer">Ko'roq ko'rish</Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;
