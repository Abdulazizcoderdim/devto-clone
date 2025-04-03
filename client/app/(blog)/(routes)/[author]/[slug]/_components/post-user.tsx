import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { useAuthStore } from "@/hooks/auth-store";

const PostUser = () => {
  const { user } = useAuthStore();

  return (
    <div className="max-w-96 bg-green-100 w-full max-lg:hidden">
      <Card className="p-4">
        <CardHeader className="space-y-6 pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
              />
              <AvatarFallback>
                {user?.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h4 className="text-lg font-semibold">{user?.name}</h4>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default PostUser;
