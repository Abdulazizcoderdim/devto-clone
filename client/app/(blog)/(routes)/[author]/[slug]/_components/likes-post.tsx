import { Button } from "@/components/ui/button";
import { Ellipsis, MessageCircleMore, Save, ThumbsUp } from "lucide-react";

const LikesPost = () => {
  return (
    <div className="pt-16">
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-2">
          <ThumbsUp
            size={24}
            className="hover:text-red-500 cursor-pointer transition-colors duration-200"
          />
          <span className="text-foregroundtext-xs text-muted-foreground select-none">
            2
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MessageCircleMore
            size={24}
            className="hover:text-yellow-500 cursor-pointer transition-colors duration-200"
          />
          <span className="text-foregroundtext-xs text-muted-foreground select-none">
            2
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Save
            size={24}
            className="hover:text-blue-500 cursor-pointer transition-colors duration-200"
          />
          <span className="text-foregroundtext-xs text-muted-foreground select-none">
            2
          </span>
        </div>
        <Button variant="ghost" size={"icon"} className="rounded-full p-0">
          <Ellipsis size={24} />
        </Button>
      </div>
    </div>
  );
};

export default LikesPost;
