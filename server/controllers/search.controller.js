const prisma = require("../config/prismaClient");
const BaseError = require("../errors/base.error");

class SearchController {
  async searchPosts(req, res, next) {
    try {
      const { q } = req.query;

      if (!q || q.trim() === "") {
        return BaseError.BadRequest("Query is Required");
      }

      const posts = await prisma.post.findMany({
        where: {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { content: { contains: q, mode: "insensitive" } },
            {
              tags: {
                some: {
                  tag: {
                    name: { contains: q, mode: "insensitive" },
                  },
                },
              },
            },
            {
              author: {
                name: {
                  contains: q,
                  mode: "insensitive",
                },
              },
            },
          ],
        },
        select: {
          title: true,
          slug: true,
          createdAt: true,
          author: {
            select: { name: true },
          },
        },
        orderBy: {
          score: "desc",
        },
        take: 10,
      });

      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SearchController();
