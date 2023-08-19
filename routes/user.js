const express = require("express");
const userController = require("../controller/user");
const routes = express.Router();

routes
  .get("/", userController.getAllUsers)
  .get("/:id", userController.getUser)
  .post("/update/:id", userController.updateUser)
  .patch("/follow/:id", userController.followUser)
  .patch("/unFollow/:id", userController.unFollowUser)
  .delete("/delete/:id", userController.deleteUser);

exports.routes = routes;
