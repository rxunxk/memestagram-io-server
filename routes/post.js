const express = require("express");
const postController = require("../controller/post");
const routes = express.Router();

routes
  .post("/", postController.createPost)
  .get("/", postController.getPosts)
  .get("/:id", postController.getPost)
  .patch("/:id", postController.updatePost);

exports.routes = routes;
