import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/hooks/auth-store";
import { useState } from "react";
import { Link } from "react-router-dom";

const QuickCreatePost = () => {
  const [content, setContent] = useState<string>("");
  const { user, isAuth } = useAuthStore();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    // Handle post submission logic here
    console.log("Post submitted:", content);
  };

  return (
    isAuth && (
      <Card className="p-2 rounded-md">
        <CardContent className="p-0">
          <Textarea
            onChange={handleContentChange}
            placeholder="What's on your mind?"
          />
          <div className="flex pt-2 justify-between items-center">
            <div className="text-xs text-muted-foreground select-none">
              <strong>Quickie Posts (beta)</strong> show up in the feed but not
              notifications or your profile —{" "}
              <Link
                to="/new"
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                Open Full Editor
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                {content.length}/280{" "}
              </p>
              <Button
                disabled={content.length === 0}
                type="submit"
                onClick={handleSubmit}
                variant={"default"}
                asChild
                className="w-fit"
              >
                <Link to={`/${user?.name}/`}>Post</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  );
};

export default QuickCreatePost;
