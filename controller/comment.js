const model = require("../model/comment");
const Comment = model.Comment;

//Create Comment - POST
const createComment = async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(400).json(err);
  }
};

//Get Comments - GET
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(201).json(comments);
  } catch (err) {
    res.status(400).json(err);
  }
};

//Get a single comment - GET
const getComment = async (req, res) => {
  try {
    const comment = await Comment.find({ _id: req.params.id });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
};

//Update Comment - PATCH
const updateComment = async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: commentId },
      req.body,
      { new: true }
    );
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
};

//Update Likes - PATCH
const likeComment = async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: commentId },
      { $push: { likedBy: req.body.userId } },
      { new: true }
    );
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
};

const dislikeComment = async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: commentId },
      { $pull: { likedBy: req.body.userId } },
      { new: true }
    );
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
};

//Delete Comment - DELETE
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({ _id: req.params.id });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getCommentsOnThisPost = async (req, res) => {
  try {
    const comment = await Comment.find({ postId: req.params.id });
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.createComment = createComment;
exports.getComment = getComment;
exports.getComments = getComments;
exports.updateComment = updateComment;
exports.deleteComment = deleteComment;
exports.likeComment = likeComment;
exports.dislikeComment = dislikeComment;
exports.getCommentsOnThisPost = getCommentsOnThisPost;
