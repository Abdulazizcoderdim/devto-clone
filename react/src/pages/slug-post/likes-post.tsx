import { useState, useEffect } from "react";
import {
  ThumbsUp,
  Heart,
  Lightbulb,
  Laugh,
  Angry,
  Save,
  MessageCircleMore,
  MoreHorizontal,
  Loader2,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import api from "@/http/axios";
import { Skeleton } from "@/components/ui/skeleton";

// Reaksiya ikonkalari
const ReactionIcons = [
  { icon: <ThumbsUp className="h-5 w-5" />, emoji: "like" },
  { icon: <Heart className="h-5 w-5" />, emoji: "love" },
  { icon: <Lightbulb className="h-5 w-5" />, emoji: "insightful" },
  { icon: <Laugh className="h-5 w-5" />, emoji: "laugh" },
  { icon: <Angry className="h-5 w-5" />, emoji: "angry" },
];

const LikesPost = ({ postId }: { postId: string }) => {
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [reactionCounts, setReactionCounts] = useState({
    total: 0,
    comments: 0,
    saves: 0,
  });
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Post reaksiyalarni yuklash
  const fetchReactions = async () => {
    try {
      const response = await api.get(`/reactions/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setReactionCounts({
        total: response.data.totalReactions || 0,
        comments: response.data.commentCount || 0,
        saves: response.data.saveCount || 0,
      });

      // Agar foydalanuvchi reaksiya qo'ygan bo'lsa, uni ko'rsatish
      if (response.data.userReaction) {
        setSelectedReaction(response.data.userReaction.type);
      } else {
        setSelectedReaction(null);
      }
    } catch (error) {
      console.error("Reaksiyalarni yuklashda xatolik:", error);
    }
  };

  // Komponentni ilk yuklashda reaksiyalarni olish
  useEffect(() => {
    fetchReactions();
  }, [postId]);

  // Reaksiyani tanlash va serverga yuborish
  const handleReactionSelect = async (reaction: string) => {
    setLoading(true);
    setPopoverOpen(false);

    try {
      const response = await api.post(
        "/reactions",
        {
          postId: postId,
          type: reaction,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      // Agar reaksiya o'chirilgan bo'lsa
      if (response.data.action === "removed" && selectedReaction === reaction) {
        setSelectedReaction(null);
      } else {
        setSelectedReaction(reaction);
      }

      // Reaksiyalar sonini yangilash
      fetchReactions();
      setLoading(false);
    } catch (error) {
      console.error("Reaction yuborishda xatolik:", error);
      setLoading(false);
    }
  };

  // Reaksiya tugmasining ko'rinishi
  const getReactionButtonIcon = () => {
    if (selectedReaction) {
      const selected = ReactionIcons.find((r) => r.emoji === selectedReaction);
      if (selected) {
        // Tanlangan reaksiya ikonkasi va rangi
        return <div className="text-blue-500">{selected.icon}</div>;
      }
    }
    return <ThumbsUp size={24} />;
  };

  return (
    <div className="md:pt-16 max-md:px-8">
      <div className="flex md:flex-col max-md:justify-between items-center gap-5">
        {/* Reaksiya tugmasi */}
        <div className="flex md:flex-col items-center gap-2">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger>
              <Button
                variant="ghost"
                size="icon"
                className={selectedReaction ? "text-blue-500" : ""}
              >
                {getReactionButtonIcon()}
              </Button>
            </PopoverTrigger>
            <PopoverContent side="right" className="p-2 w-auto">
              <div className="flex gap-2">
                {ReactionIcons.map((reaction, i) => (
                  <div
                    key={i}
                    onClick={() => handleReactionSelect(reaction.emoji)}
                    className={`p-2 cursor-pointer hover:bg-gray-100 rounded-full ${
                      selectedReaction === reaction.emoji ? "bg-blue-100" : ""
                    }`}
                  >
                    {reaction.icon}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          {loading ? (
            <Skeleton className="h-4 w-6" />
          ) : (
            <span className="text-xs text-muted-foreground">
              {reactionCounts.total}
            </span>
          )}
        </div>

        {/* Kommentlar */}
        <div className="flex md:flex-col items-center gap-2">
          <Button variant="ghost" size="icon">
            <MessageCircleMore size={24} />
          </Button>
          <span className="text-xs text-muted-foreground">
            {reactionCounts.comments}
          </span>
        </div>

        {/* Saqlash */}
        <div className="flex md:flex-col items-center gap-2">
          <Button variant="ghost" size="icon">
            <Save size={24} />
          </Button>
          <span className="text-xs text-muted-foreground">
            {reactionCounts.saves}
          </span>
        </div>

        {/* Qo'shimcha opsiyalar */}
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={24} />
        </Button>
      </div>
    </div>
  );
};

export default LikesPost;
