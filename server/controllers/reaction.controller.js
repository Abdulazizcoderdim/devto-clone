const prisma = require("../config/prismaClient");
const { calculatePostScore } = require("../services/postScoreService");

class ReactionController {
  async addReaction(req, res, next) {
    try {
      const { postId, type } = req.body;
      const userId = req.user.id;

      await prisma.reaction.create({
        data: {
          userId,
          postId,
          type,
        },
      });

      await calculatePostScore(prisma, postId);

      return res.status(201).json({ message: "Reaction added" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ReactionController();
