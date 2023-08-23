const commentController = require("../controller/comment");
const express = require("express");
const routes = express.Router();

routes
  .get("/", commentController.getComments)
  .get("/:id", commentController.getComment)
  .get("/post/:id", commentController.getCommentsOnThisPost)
  .post("/", commentController.createComment)
  .patch("/update/:id", commentController.updateComment)
  .patch("/like/:id", commentController.likeComment)
  .patch("/dislike/:id", commentController.dislikeComment)
  .delete("/:id", commentController.deleteComment);

exports.routes = routes;
