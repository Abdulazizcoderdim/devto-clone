import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { useAuthStore } from "@/hooks/auth-store";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const PostAuthor = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="max-w-96 bg-green-100 w-full max-lg:hidden">
      <Card className="p-4">
        <CardHeader className="space-y-3 pb-4">
          <div className="flex items-center gap-2">
            <Avatar
              className="h-12 w-12 cursor-pointer"
              onClick={() => navigate(`/${user?.name}`)}
            >
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
              />
              <AvatarFallback>
                {user?.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h4
              onClick={() => navigate(`/${user?.name}`)}
              className="text-lg font-semibold hover:text-blue-800 transition-all duration-150 cursor-pointer"
            >
              {user?.name}
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
            <p>
              {user?.createdAt
                ? format(new Date(user.createdAt), "MMM dd, yyyy")
                : "Loading..."}
            </p>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default PostAuthor;
