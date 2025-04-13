import api from "@/http/axios";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Skeleton } from "../ui/skeleton";

interface FollowButtonProps {
  userId: string; // Kimni follow qilmoqchi
}

const FollowButton = ({ userId }: FollowButtonProps) => {
  const [isFollowed, setIsFollowed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(true);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const res = await api.get(`/follow/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setIsFollowed(res.data.isFollowing);
      } catch (error) {
        console.error("Error fetching follow status:", error);
      } finally {
        setCheckLoading(false);
      }
    };

    fetchFollowStatus();
  }, [userId]);

  const handleFollow = async () => {
    try {
      setLoading(true);
      await api.post(
        "/follow",
        { followingId: userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setIsFollowed(true);
    } catch (error: any) {
      toast.error(error.error || "Failed");
      console.error("Follow error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async () => {
    try {
      setLoading(true);
      await api.delete(`/unfollow/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setIsFollowed(false);
    } catch (error: any) {
      toast.error(error.error || "Failed");
      console.error("Unfollow error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (checkLoading) {
    return <Skeleton className="w-28 h-10" />;
  }

  return isFollowed ? (
    <Button variant={"outline"} disabled={loading} onClick={handleUnfollow}>
      Unfollow
    </Button>
  ) : (
    <Button disabled={loading} onClick={handleFollow}>
      Follow
    </Button>
  );
};

export default FollowButton;
