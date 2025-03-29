const prisma = require("../config/prismaClient");

class PostController {
  async getAll(req, res, next) {
    try {
      const { page = 1, size = 10 } = req.query;

      const pageNumber = parseInt(page);
      const pageSize = parseInt(size);
      const skip = (parseInt(page) - 1) * parseInt(size);

      const posts = await prisma.post.findMany({
        skip: parseInt(skip),
        take: parseInt(size),
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
          comments: {
            take: 3,
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
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
  async create(req, res, next) {
    try {
      const { title, content, slug, authorId, tags } = req.body;

      if (!title || !content || !authorId) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Generate a slug if not provided
      const finalSlug = slug || title.toLowerCase().replace(/\s+/g, "-");

      // Increase transaction timeout to 15 seconds
      const result = await prisma.$transaction(
        async (tx) => {
          // Create the post
          const post = await tx.post.create({
            data: {
              title,
              content,
              slug: finalSlug,
              authorId,
            },
          });

          // If tags are provided, create the post-tag relationships
          if (tags && Array.isArray(tags) && tags.length > 0) {
            // Process tags more efficiently by preparing data first
            const existingTags = await tx.tag.findMany({
              where: {
                name: {
                  in: tags,
                },
              },
            });

            const existingTagNames = existingTags.map((tag) => tag.name);
            const newTagNames = tags.filter(
              (tag) => !existingTagNames.includes(tag)
            );

            // Create new tags one by one instead of using createMany
            const createdTags = [];
            for (const tagName of newTagNames) {
              try {
                const newTag = await tx.tag.create({
                  data: { name: tagName },
                });
                createdTags.push(newTag);
              } catch (error) {
                // Skip if tag already exists (handle unique constraint)
                if (error.code !== "P2002") {
                  throw error;
                }
                // If tag already exists but wasn't found earlier, fetch it
                const existingTag = await tx.tag.findUnique({
                  where: { name: tagName },
                });
                if (existingTag) {
                  createdTags.push(existingTag);
                }
              }
            }

            // Combine existing and newly created tags
            const allTags = [...existingTags, ...createdTags];

            // Create PostTag relationships one by one
            for (const tag of allTags) {
              await tx.postTag.create({
                data: {
                  postId: post.id,
                  tagId: tag.id,
                },
              });
            }
          }

          // Return the post directly without an additional query
          return post;
        },
        {
          timeout: 15000, // Set timeout to 15 seconds
        }
      );

      // After transaction completes, fetch the post with all relationships
      const completePost = await prisma.post.findUnique({
        where: { id: result.id },
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      return res.status(201).json({
        success: true,
        data: completePost,
      });
    } catch (error) {
      if (error.code === "P2002" && error.meta?.target?.includes("slug")) {
        return res.status(400).json({ error: "Slug already exists" });
      }
      console.error("Post creation error:", error);
      next(error);
    }
  }
  async getOne() {}
  async update() {}
  async delete() {}
}

module.exports = new PostController();
