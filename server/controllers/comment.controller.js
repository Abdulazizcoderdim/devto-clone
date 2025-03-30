import prisma from "../config/prismaClient";

class CommentController {
  async create(req, res, next) {
    try {
      const { text, postId, userId } = req.body;

      if (!text || !postId) {
        return res.status(400).json({
          message: "Text, postId are required",
        });
      }

      const newComment = await prisma.comment.create({
        data: {
          text,
          post: { connect: { id: postId } },
          user: userId ? { connect: { id: userId } } : undefined,
        },
      });

      return res.status(201).json({
        message: "Comment created successfully",
        data: newComment,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {}

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      //   pagination
      const { page = 1, size = 10 } = req.query;
      const pageNumber = parseInt(page);
      const pageSize = parseInt(size);
      const skip = (parseInt(page) - 1) * parseInt(size);

      const comments = await prisma.comment.findMany({
        skip: parseInt(skip),
        take: parseInt(size),
        where: { postId: id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (!comments) {
        return res.status(404).json({ message: "Comment not found" });
      }

      const totalElements = await prisma.comment.count({
        where: { postId: id },
      });
      const totalPages = Math.ceil(totalElements / pageSize);

      return res.status(200).json({
        content: comments,
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

  async update(req, res, next) {}

  async delete(req, res, next) {}
}

export default new CommentController();
