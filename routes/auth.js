const router = require("express").Router();
const authController = require("../controller/auth");

router
  .post("/register", authController.createUser)
  .post("/login", authController.loginUser);

exports.router = router;
