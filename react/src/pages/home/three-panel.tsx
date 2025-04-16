import LoadingPost from "@/components/shared/loading-post";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetcher } from "@/lib/fetcher";
import { IDiscussion } from "@/types";
import { Rocket, ImageIcon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

const ThreePanel = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useSWR<IDiscussion[]>(
    "/comments/active-discussions",
    fetcher
  );

  if (isLoading) return <LoadingPost />;
  if (error) return <div className="p-4 pt-20">Error loading discussions</div>;
  if (!data || data.length === 0)
    return <div className="p-4 pt-20">No active discussions found</div>;

  // Function to get appropriate emoji for the title
  const getEmoji = (title: string) => {
    if (
      title.toLowerCase().includes("stellar") ||
      title.toLowerCase().includes("dev diaries")
    ) {
      return <Rocket className="h-4 w-4 text-purple-500 mr-2" />;
    } else if (
      title.toLowerCase().includes("screensaver") ||
      title.toLowerCase().includes("photo")
    ) {
      return (
        <>
          <ImageIcon className="h-4 w-4 text-blue-500 mr-1" />
          <Sun className="h-4 w-4 text-yellow-500 mr-1" />
        </>
      );
    }
    return null;
  };

  return (
    <Card className="w-full rounded-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Active discussions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((discussion) => (
          <div
            key={discussion.id}
            className="border-b pb-4 last:border-b-0 last:pb-0"
          >
            <div className="flex items-center">
              {getEmoji(discussion.title)}
              <h3
                onClick={() =>
                  navigate(`/${discussion.author.name}/${discussion.slug}`)
                }
                className="font-medium text-muted-foreground hover:underline cursor-pointer"
              >
                {discussion.title}
              </h3>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {discussion._count.comments} comments
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ThreePanel;
