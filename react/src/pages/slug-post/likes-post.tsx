import { useState } from "react";
import useSWR from "swr";
import {
  ThumbsUp,
  Heart,
  Lightbulb,
  Laugh,
  Angry,
  Save,
  MessageCircleMore,
  MoreHorizontal,
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

// SWR fetcher
const fetchReactions = async (postId: string) => {
  const response = await api.get(`/reactions/${postId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

const LikesPost = ({
  postId,
  mutate: mutatePost,
}: {
  postId: string;
  mutate: any;
}) => {
  const [loading, setLoading] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const {
    data,
    isLoading,
    mutate, // SWR mutatsiya qilish uchun
  } = useSWR(postId ? [`/reactions/${postId}`, postId] : null, () =>
    fetchReactions(postId)
  );

  const selectedReaction = data?.userReaction?.type || null;
  const totalReactions = data?.totalReactions || 0;
  const commentCount = data?.commentCount || 0;
  const saveCount = data?.saveCount || 0;

  // Reaksiya yuborish
  const handleReactionSelect = async (reaction: string) => {
    setLoading(true);
    setPopoverOpen(false);

    try {
      await api.post(
        "/reactions",
        {
          postId,
          type: reaction,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      // Ma'lumotni yangilash
      await mutate(); // serverdan yangi malumot olib keladi
      // await mutatePost();
    } catch (error) {
      console.error("Reaction yuborishda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  const getReactionButtonIcon = () => {
    if (selectedReaction) {
      const selected = ReactionIcons.find((r) => r.emoji === selectedReaction);
      if (selected) {
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
          {isLoading || loading ? (
            <Skeleton className="h-4 w-6" />
          ) : (
            <span className="text-xs text-muted-foreground">
              {totalReactions}
            </span>
          )}
        </div>

        {/* Kommentlar */}
        <div className="flex md:flex-col items-center gap-2">
          <Button variant="ghost" size="icon">
            <MessageCircleMore size={24} />
          </Button>
          <span className="text-xs text-muted-foreground">{commentCount}</span>
        </div>

        {/* Saqlash */}
        <div className="flex md:flex-col items-center gap-2">
          <Button variant="ghost" size="icon">
            <Save size={24} />
          </Button>
          <span className="text-xs text-muted-foreground">{saveCount}</span>
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
