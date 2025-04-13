const prisma = require("../config/prismaClient");

class FollowController {
  async follow(req, res, next) {
    try {
      const { id: followerId } = req.user; // JWT token orqali kim follow qilayotganini bilamiz
      const { followingId } = req.body;

      if (followerId === followingId) {
        return res
          .status(400)
          .json({ error: "O'zinga follow bosib bo'lmaydi" });
      }

      const follow = await prisma.userFollow.create({
        data: {
          followerId,
          followingId,
        },
      });

      return res.status(201).json(follow);
    } catch (error) {
      next(error);
    }
  }

  async unfollow(req, res, next) {
    try {
      const { id: followerId } = req.user;
      const { followingId } = req.params;

      await prisma.userFollow.delete({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      });

      return res.status(200).json({ message: "Unfollow qilindi!" });
    } catch (error) {
      next(error);
    }
  }

  async getFollowers(req, res, next) {
    try {
      console.log("User from authMiddleware:", req.user); // log
      const { id } = req.user;

      const followers = await prisma.userFollow.findMany({
        where: { followingId: id },
        include: {
          follower: true,
        },
      });

      return res.status(200).json(followers);
    } catch (error) {
      next(error);
    }
  }

  async getFollowing(req, res, next) {
    try {
      const { id } = req.user;

      const following = await prisma.userFollow.findMany({
        where: { followerId: id },
        include: {
          following: true,
        },
      });

      return res.status(200).json(following);
    } catch (error) {
      next(error);
    }
  }

  async checkFollow(req, res, next) {
    try {
      const followerId = req.user.id;
      const followingId = req.params.userId;

      const existing = await prisma.userFollow.findFirst({
        where: { followerId, followingId },
      });

      res.json({ isFollowing: !!existing });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FollowController();
