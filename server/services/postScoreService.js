const weights = {
  like: 2,
  love: 3,
  insightful: 2.5,
  laugh: 1,
  angry: -2,
};

async function calculatePostScore(prisma, postId) {
  const commentCount = await prisma.comment.count({ where: { postId } });

  const reactions = await prisma.reaction.groupBy({
    by: ["type"],
    where: { postId },
    _count: true,
  });

  // Reactionlarning har birini og‘irlik bilan hisoblash
  let reactionScore = 0;

  for (const reaction of reactions) {
    const weight = weights[reaction.type] ?? 0; // Default 0, agar reaction turi ma'lum bo'lmasa
    reactionScore += weight * reaction._count;
  }

  // Scoreni hisoblash (faqat reactionlar va commentlar asosida)
  const score = reactionScore + commentCount * 1;

  await prisma.post.update({
    where: { id: postId },
    data: { score },
  });
}

module.exports = { calculatePostScore };
