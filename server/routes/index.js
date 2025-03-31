const authController = require("../controllers/auth.controller");
const commentController = require("../controllers/comment.controller");
const postController = require("../controllers/post.controller");
const sumController = require("../controllers/sum.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = require("express").Router();

require("express-group-routes");

router.group("/auth", (router) => {
  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.post("/verify", authController.verify);
  router.get("/refresh", authController.refresh);
  router.get("/me", authMiddleware, authController.me);
  router.delete("/logout", authController.logout);
});

router.group("/posts", (router) => {
  router.get("/", postController.getAll);
  router.get("/:id", postController.getOne);
  router.post("/", authMiddleware, postController.create);
  router.put("/:id", authMiddleware, postController.update);
  router.delete("/:id", authMiddleware, postController.delete);
  router.post("/like", authMiddleware, postController.like);
});

router.group("/comments", (router) => {
  router.get("/post/:postId", commentController.getCommentsByPost);
  router.post("/", authMiddleware, commentController.create);
  router.put("/:id", authMiddleware, commentController.update);
  router.delete("/:id", authMiddleware, commentController.delete);
});

router.group("/users", (router) => {
  router.get("/");
  router.get("/:id");
});

router.group("/summarize", (router) => {
  router.post("/", sumController.summarize);
});

module.exports = router;
