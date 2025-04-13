import { followService } from "@/services/followService";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../ui/button";

interface FollowButtonProps {
  userId: string;
  initialFollowState?: boolean;
  onFollowChange?: (isFollowing: boolean) => void;
}

const FollowButton = ({
  userId,
  initialFollowState = false,
  onFollowChange,
}: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check initial follow status if not provided
    if (initialFollowState === undefined) {
      const checkStatus = async () => {
        try {
          const status = await followService.checkFollowStatus(userId);
          setIsFollowing(status);
        } catch (error) {
          console.error("Error checking follow status:", error);
        }
      };

      checkStatus();
    }
  }, [userId, initialFollowState]);

  const handleFollowToggle = async () => {
    setIsLoading(true);

    try {
      if (isFollowing) {
        await followService.unfollow(userId);
        toast.success("Unfollowed successfully");
      } else {
        await followService.follow(userId);
        toast.success("Following successfully");
      }

      setIsFollowing(!isFollowing);
      if (onFollowChange) {
        onFollowChange(!isFollowing);
      }
    } catch (error: any) {
      console.error("Follow action failed:", error);
      toast.error(error?.error || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={isFollowing ? "outline" : "default"}
      className="mr-2 px-8"
      onClick={handleFollowToggle}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : isFollowing ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
