const authController = require("../controllers/auth.controller");
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
});

router.group("/users", (router) => {
  router.get("/");
  router.get("/:id");
});

router.group("/summarize", (router) => {
  router.post("/", sumController.summarize);
});

module.exports = router;
