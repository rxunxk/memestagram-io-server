const express = require("express");
require("dotenv").config();
const userRouter = require("./routes/user");
const server = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const cors = require("cors");
//Database connection
dbCon().catch((err) => console.log(err));

async function dbCon() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("db connected");
}

//Middlewares
server.use(cors());
server.use(express.json()); //body parser
server.use(helmet());
server.use(morgan("default"));
server.use("/auth", authRouter.router);
server.use("/users", userRouter.routes);
server.use("/posts", postRouter.routes);
server.use("/", (req, res) => {
  res.send("Welcome to the server");
});
server.listen(process.env.PORT, (req, res) => {
  console.log("server has started");
});
