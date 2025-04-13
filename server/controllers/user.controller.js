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
          posts: {
            select: {
              author: {
                select: {
                  id: true,
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
