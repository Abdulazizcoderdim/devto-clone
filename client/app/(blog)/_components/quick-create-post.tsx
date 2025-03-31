import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/hooks/auth-store";
import Link from "next/link";
import { useState } from "react";

const QuickCreatePost = () => {
  const [content, setContent] = useState<string>("");
  const { user } = useAuthStore();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    // Handle post submission logic here
    console.log("Post submitted:", content);
  };

  return (
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
              href="/new"
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              Open Full Editor
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">0/280 </p>
            <Button
              disabled={content.length !== 0}
              type="submit"
              onClick={handleSubmit}
              variant={"default"}
              asChild
              className="w-fit"
            >
              <Link href={`/${user?.name}/`}>Post</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickCreatePost;
