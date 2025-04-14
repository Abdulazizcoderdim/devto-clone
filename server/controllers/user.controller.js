const prisma = require("../config/prismaClient");

class UserController {
  async getByUsername(req, res, next) {
    try {
      const { username } = req.params;

      const user = await prisma.user.findUnique({
        where: {
          name: username,
        },
        select: {
          _count: {
            select: {
              followers: true, // Userni follow qilganlar soni
              following: true, // User kimlarni follow qilgan
            },
          },
          id: true,
          createdAt: true,
          posts: {
            select: {
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

      res.json({
        id: user.id,
        createdAt: user.createdAt,
        followers: user._count.followers,
        following: user._count.following,
        posts: user.posts,
      }); // faqat postlar yuboriladi
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
