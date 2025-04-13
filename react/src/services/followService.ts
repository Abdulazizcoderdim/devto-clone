import api from "@/http/axios";

export const followService = {
  // Follow a user
  follow: async (followingId: string) => {
    try {
      const response = await api.post(
        "/follow",
        { followingId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  // Unfollow a user
  unfollow: async (followingId: string) => {
    try {
      const response = await api.post(
        `/unfollow`,
        { followingId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  // Get followers of current user
  getFollowers: async () => {
    try {
      const response = await api.get(`/followers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  // Get that current user is following
  getFollowing: async () => {
    try {
      const response = await api.get(`/following`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  // Check if current user is following a specific user
  checkFollowStatus: async (userId: string) => {
    try {
      const following = await followService.getFollowing();
      return following.some((follow) => follow.followingId === userId);
    } catch (error) {
      throw error;
    }
  },
};
