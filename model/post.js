const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
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
      default: [],
    },
    comments: {
      type: Array,
    },
  },
  { timestamps: true }
);

exports.Post = mongoose.model("Post", postSchema);
