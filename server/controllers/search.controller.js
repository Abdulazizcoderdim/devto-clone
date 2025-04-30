const prisma = require("../config/prismaClient");
const BaseError = require("../errors/base.error");

class SearchController {
  async searchPosts(req, res, next) {
    try {
      const { q, limit = 10, page = 1 } = req.query;

      if (!q || q.trim() === "") {
        return res.status(400).json({ error: "Query is required" });
      }

      // Parse limit and page to numbers
      const take = parseInt(limit, 10);
      const skip = (parseInt(page, 10) - 1) * take;

      // Create search terms for better matching
      const searchTerms = q.trim().split(/\s+/).filter(Boolean);

      // Base search conditions
      const baseConditions = searchTerms.map((term) => ({
        OR: [
          { title: { contains: term, mode: "insensitive" } },
          { content: { contains: term, mode: "insensitive" } },
          {
            tags: {
              some: {
                tag: {
                  name: { contains: term, mode: "insensitive" },
                },
              },
            },
          },
          {
            author: {
              name: {
                contains: term,
                mode: "insensitive",
              },
            },
          },
        ],
      }));

      // Execute search query with pagination
      const posts = await prisma.post.findMany({
        where: {
          AND: baseConditions, // AND condition makes results more relevant by requiring all terms
        },
        select: {
          id: true,
          title: true,
          slug: true,
          createdAt: true,
          excerpt: true, // Add excerpt for preview if available
          author: {
            select: {
              id: true,
              name: true,
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
            take: 3, // Limit tags for preview
          },
        },
        orderBy: [
          { score: "desc" },
          { createdAt: "desc" }, // Secondary sort by date
        ],
        take,
        skip,
      });

      // Get total count for pagination
      const totalCount = await prisma.post.count({
        where: {
          AND: baseConditions,
        },
      });

      // Format the response
      const formattedPosts = posts.map((post) => ({
        ...post,
        tags: post.tags.map((t) => t.tag.name),
        createdAt: post.createdAt.toISOString(),
      }));

      res.status(200).json({
        posts: formattedPosts,
        pagination: {
          total: totalCount,
          page: parseInt(page, 10),
          limit: take,
          pages: Math.ceil(totalCount / take),
        },
      });
    } catch (error) {
      console.error("Search error:", error);
      next(error);
    }
  }

  // Add suggestion/autocomplete endpoint
  async getSearchSuggestions(req, res, next) {
    try {
      const { q } = req.query;

      if (!q || q.trim() === "") {
        return res.status(200).json([]);
      }

      // Get quick suggestions (titles only)
      const suggestions = await prisma.post.findMany({
        where: {
          title: { contains: q.trim(), mode: "insensitive" },
        },
        select: {
          title: true,
          slug: true,
          author: {
            select: { name: true },
          },
        },
        orderBy: {
          score: "desc",
        },
        take: 5, // Limit to top 5 results for quick suggestions
      });

      // Get popular tags matching the query
      const tags = await prisma.tag.findMany({
        where: {
          name: { contains: q.trim(), mode: "insensitive" },
        },
        select: {
          name: true,
        },
        take: 3,
      });

      res.status(200).json({
        posts: suggestions,
        tags: tags.map((tag) => tag.name),
      });
    } catch (error) {
      console.error("Suggestion error:", error);
      next(error);
    }
  }
}

module.exports = new SearchController();
