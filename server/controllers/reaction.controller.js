const prisma = require("../config/prismaClient");
const { calculatePostScore } = require("../services/postScoreService");

class ReactionController {
  async addReaction(req, res, next) {
    try {
      const { postId, type } = req.body;
      const userId = req.user.id;

      // Check if reaction already exists
      const existingReaction = await prisma.reaction.findFirst({
        where: {
          userId,
          postId,
          type,
        },
      });

      if (existingReaction) {
        // If reaction exists, delete it (toggle off)
        await prisma.reaction.delete({
          where: {
            id: existingReaction.id,
          },
        });
        await calculatePostScore(prisma, postId);
        return res
          .status(200)
          .json({ message: "Reaction removed", action: "removed" });
      } else {
        // If no reaction with this type exists, check if user has any other reaction on this post
        const anyExistingReaction = await prisma.reaction.findFirst({
          where: {
            userId,
            postId,
          },
        });

        if (anyExistingReaction) {
          // If user has a different reaction, replace it
          await prisma.reaction.delete({
            where: {
              id: anyExistingReaction.id,
            },
          });
        }

        // Create the new reaction
        await prisma.reaction.create({
          data: {
            userId,
            postId,
            type,
          },
        });

        await calculatePostScore(prisma, postId);
        return res
          .status(201)
          .json({ message: "Reaction added", action: "added" });
      }
    } catch (error) {
      next(error);
    }
  }

  async getPostReactions(req, res, next) {
    try {
      const { postId } = req.params;
      const userId = req.user.id;

      // Get all reactions for the post
      const reactions = await prisma.reaction.findMany({
        where: {
          postId,
        },
      });

      // Get comments count
      const commentCount = await prisma.comment.count({
        where: {
          postId,
        },
      });

      // Get saves count
      // const saveCount = await prisma.save.count({
      //   where: {
      //     postId,
      //   },
      // });

      // Check if the current user has reacted to this post
      const userReaction = await prisma.reaction.findFirst({
        where: {
          userId,
          postId,
        },
      });

      return res.status(200).json({
        totalReactions: reactions.length,
        reactions,
        commentCount,
        saveCount: 0,
        userReaction,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ReactionController();
