import LoadingPost from "@/components/shared/loading-post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Post } from "@/types";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const PostAuthor = ({
  post,
  loading,
}: {
  post: Post | null;
  loading: boolean;
}) => {
  const navigate = useNavigate();

  return loading || !post ? (
    <LoadingPost className="max-w-96 w-full max-lg:hidden break-words" />
  ) : (
    <div className="max-w-96 w-full max-lg:hidden break-words">
      <Card className="p-4 rounded-md">
        <CardHeader className="space-y-3 pb-4">
          <div className="flex items-center gap-2">
            <Avatar
              className="h-12 w-12 cursor-pointer"
              onClick={() => navigate(`/${post?.author.name}`)}
            >
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${post?.author.name}`}
              />
              <AvatarFallback>
                {post?.author.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h4
              onClick={() => navigate(`/${post?.author.name}`)}
              className="text-lg font-semibold hover:text-blue-800 transition-all duration-150 cursor-pointer"
            >
              {post?.author.name}
            </h4>
          </div>
          <Button className="w-full cursor-pointer" variant={"default"}>
            Follow
          </Button>
          {/* <Button className="w-full cursor-pointer" variant={"outline"}>
            Following
          </Button> */}
          <div className="flex flex-col">
            <strong className="text-xs text-muted-foreground">JOINED</strong>
            <p>{format(new Date(post?.author.createdAt), "MMM dd, yyyy")}</p>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default PostAuthor;
