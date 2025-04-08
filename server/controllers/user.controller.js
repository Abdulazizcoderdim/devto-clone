const prisma = require("../config/prismaClient");

class UserController {
  async follow(req, res, next) {
    try {
      const { id: followerId } = req.user;
      const { followingId } = req.body;

      if (followerId === followingId) {
        return res.status(400).json({ error: "You can't follow yourself" });
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
      const { followingId } = req.body;

      const follow = await prisma.userFollow.delete({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      });

      return res.status(200).json({ message: "Unfollowed" });
    } catch (error) {
      next(error);
    }
  }

  async getFollowers(req, res, next) {
    try {
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
}

module.exports = new UserController();
