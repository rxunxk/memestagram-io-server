const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likedBy: {
      type: Array,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

exports.Post = mongoose.model("Post", postSchema);
