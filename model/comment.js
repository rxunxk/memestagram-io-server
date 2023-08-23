const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    likedBy: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

exports.Comment = mongoose.model("Comment", commentSchema);
