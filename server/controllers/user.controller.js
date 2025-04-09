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

      await prisma.userFollow.delete({
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

  async getByUsername(req, res, next) {
    try {
      const { username } = req.params;

      const user = await prisma.user.findUnique({
        where: {
          name: username,
        },
        select: {
          posts: {
            select: {
              author: {
                select: {
                  createdAt: true,
                },
              },
              slug: true,
              coverImageLink: true,
              title: true,
              createdAt: true,
              _count: {
                select: {
                  comments: true,
                },
              },
              tags: {
                select: {
                  tag: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user.posts); // faqat postlar yuboriladi
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
