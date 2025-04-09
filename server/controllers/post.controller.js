const prisma = require("../config/prismaClient");
const BaseError = require("../errors/base.error");
const { htmlToText } = require("html-to-text");

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
      const { title, content, slug, tags, coverImageLink } = req.body;
      const authorId = req.user.id;

      if (!title || !content || !authorId) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const author = await prisma.user.findUnique({
        where: {
          id: authorId,
        },
      });

      if (!author) {
        return res.status(404).json({ error: "Author not found" });
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
              coverImageLink,
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
        message: "Post created successfully 🎉",
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
  async getOne(req, res, next) {
    try {
      const { slug } = req.params;

      const post = await prisma.post.findUnique({
        where: {
          slug,
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: {
                select: {
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

      if (!post) {
        return BaseError.BadRequest("Post not found");
      }

      return res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }
  async update() {}
  async delete() {}
  async like() {
    try {
      const { like, id } = req.body;
      const userId = req.user.id; // Assuming you have user ID in req.user
      const postId = parseInt(id);

      const post = await prisma.post.findUnique({
        where: { id: postId },
      });
      if (!post) {
        return next(BaseError.BadRequest("Post not found"));
      }

      const reaction = await prisma.reaction.upsert({
        where: {
          userId_postId_type: {
            userId,
            postId,
            type: like,
          },
        },
        update: {},
        create: {
          userId,
          postId,
          type: like,
        },
      });

      return res.status(200).json({
        data: reaction,
      });
    } catch (error) {
      next(error);
    }
  }

  async filterByTag(req, res, next) {
    try {
      const { query } = req.query;

      if (!query) {
        const popularTags = await prisma.tag.findMany({
          take: 10,
          orderBy: {
            posts: {
              _count: "desc",
            },
          },
        });

        return res.status(200).json({ tags: popularTags });
      }

      const tags = await prisma.tag.findMany({
        where: {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        take: 10,
      });

      res.json({ tags });
    } catch (error) {
      next(error);
    }
  }

  async summarize(req, res, next) {
    try {
      const { id } = req.params;

      const post = await prisma.post.findUnique({
        where: { id },
      });

      if (!post) {
        return next(BaseError.BadRequest("Post not found"));
      }

      const text = htmlToText(post.content);

      // Check isSummary
      if (post.summary) {
        return res.json({ summary: post.summary });
      }

      const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

      const response = await axios.post(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        { inputs: text },
        {
          headers: { Authorization: `Bearer ${HUGGINGFACE_API_KEY}` },
        }
      );

      const summaryText = response.data[0].summary_text;

      // save db
      const updatedPost = await prisma.post.update({
        where: { id },
        data: { summary: summaryText },
      });

      res.json({ summary: updatedPost.summary });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
