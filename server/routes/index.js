const authController = require("../controllers/auth.controller");
const commentController = require("../controllers/comment.controller");
const followController = require("../controllers/follow.controller");
const postController = require("../controllers/post.controller");
const reactionController = require("../controllers/reaction.controller");
const searchController = require("../controllers/search.controller");
const sumController = require("../controllers/sum.controller");
const tagController = require("../controllers/tag.controller");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = require("express").Router();

require("express-group-routes");

router.group("/auth", (router) => {
  /**
   * @openapi
   * /register:
   *  get:
   *    tag:
   *      - Register
   *      description: Register a new user
   *      responses:
   *        200:
   *          description: Success!
   */
  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.post("/verify", authController.verify);
  router.get("/refresh", authController.refresh);
  router.get("/me", authMiddleware, authController.me);
  router.delete("/logout", authController.logout);
});

router.group("/posts", (router) => {
  router.get("/", postController.getAll);
  router.get("/:slug", postController.getOne);
  router.post("/", authMiddleware, postController.create);
  router.put("/:id", authMiddleware, postController.update);
  router.delete("/:id", authMiddleware, postController.delete);
  router.post("/like", authMiddleware, postController.like);
  router.get("/tags/filter", authMiddleware, postController.filterByTag);
  router.get("/tags/:tagName", postController.getPostsByTagName);
  router.post("/:id/summarize", authMiddleware, postController.summarize);
  router.get("/following", authMiddleware, postController.getFollowingPosts);
});

router.group("/reactions", (router) => {
  router.post("/", authMiddleware, reactionController.addReaction);
  router.get("/:postId", authMiddleware, reactionController.getPostReactions);
});

router.group("/comments", (router) => {
  router.get("/post/:postId", commentController.getCommentsByPost);
  router.post("/", authMiddleware, commentController.create);
  router.put("/:id", authMiddleware, commentController.update);
  router.delete("/:id", authMiddleware, commentController.delete);
  router.get("/active-discussions", commentController.getActiveDiscussions);
});

router.group("/tags", (router) => {
  router.get("/:id", tagController.getById);
});

router.group("/users", (router) => {
  router.get("/:username", userController.getByUsername);
});

router.group("/", (router) => {
  router.post("/follow", authMiddleware, followController.follow);
  router.delete(
    "/unfollow/:followingId",
    authMiddleware,
    followController.unfollow
  );
  router.get("/following", authMiddleware, followController.getFollowing);
  router.get("/followers", authMiddleware, followController.getFollowers);
  router.get("/follow/:userId", authMiddleware, followController.checkFollow);
});

router.group("/search", (router) => {
  router.get("/", searchController.searchPosts);
  router.get("/suggestions", searchController.getSearchSuggestions);
});

router.group("/summarize", (router) => {
  router.post("/", sumController.summarize);
});

module.exports = router;
