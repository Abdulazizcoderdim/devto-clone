const prisma = require("../config/prismaClient");

class PostController {
  async getAll(req, res, next) {
    try {
      const { page = 1, size = 10 } = req.query;

      const pageNumber = parseInt(page);
      const pageSize = parseInt(size);
      const skip = (page - 1) * size;

      const posts = await prisma.post.findMany({
        skip: parseInt(skip),
        take: parseInt(size),
        orderBy: {
          createdAt: "desc",
        },
      });

      const totalElements = await prisma.post.count();
      const totalPages = Math.ceil(totalElements / pageSize);

      res.json({
        content: posts,
        page: {
          number: pageNumber,
          size: pageSize,
          totalElements,
          totalPages,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async create() {
    try {
        
    } catch (error) {
      next(error);
    }
  }
  async getOne() {}
  async update() {}
  async delete() {}
}

module.exports = new PostController();
