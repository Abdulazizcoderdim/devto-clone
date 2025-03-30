const prisma = require("../config/prismaClient");

class CommentController {
  async create(req, res, next) {
    try {
      const { text, postId } = req.body;
      const { id: userId } = req.user;

      if (!text || !postId) {
        return res.status(400).json({
          message: "Text, postId are required",
        });
      }

      if (!userId) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      const newComment = await prisma.comment.create({
        data: {
          text,
          post: { connect: { id: postId } },
          user: { connect: { id: userId } },
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

  async getCommentsByPost(req, res, next) {
    try {
      const { postId } = req.params;

      //pagination
      const { page = 1, size = 10 } = req.query;
      const pageNumber = parseInt(page);
      const pageSize = parseInt(size);
      const skip = (parseInt(page) - 1) * parseInt(size);

      const comments = await prisma.comment.findMany({
        skip: parseInt(skip),
        take: parseInt(size),
        where: { postId },
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

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({
          message: "Text is required",
        });
      }

      const comment = await prisma.comment.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      const updateComment = await prisma.comment.update({
        where: { id },
        data: {
          text,
        },
      });

      return res.status(200).json({
        message: "Comment updated successfully",
        data: updateComment,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const comment = await prisma.comment.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      await prisma.comment.delete({
        where: { id },
      });

      return res.status(200).json({
        message: "Comment deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CommentController();
