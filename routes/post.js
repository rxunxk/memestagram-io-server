const express = require("express");
const postController = require("../controller/post");
const routes = express.Router();

routes
  .post("/", postController.createPost)
  .post("/followed", postController.getFollowedPosts)
  .get("/", postController.getPosts)
  .get("/:id", postController.getPost)
  .patch("/update/:id", postController.updatePost)
  .patch("/like/:id", postController.likePost)
  .patch("/dislike/:id", postController.dislikePost)
  .delete("/delete/:id", postController.deletePost);

exports.routes = routes;
