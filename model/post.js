const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    authorProfilePic: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
      default: "",
      required: true,
    },
    likedBy: {
      type: Array,
    },
  },
  { timestamps: true }
);

exports.Post = mongoose.model("Post", postSchema);
