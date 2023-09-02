const model = require("../model/post");
const Post = model.Post;

//Craete Post - POST
const createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(400).json(err);
  }
};

//Get Posts - GET
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    req.status(400).json(err);
  }
};

//Get Single Post - GET
const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
};

//Update Post - PATCH
const updatePost = async (req, res) => {
  //req.params.id => post id that is to be update
  //req.body => update post
  try {
    const post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
};

//Like Post - PATCH
const likePost = async (req, res) => {
  //req.params.id => post id that is to be updated
  //req.body.currentUser => user who clicked the like button
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { likedBy: req.body.currentUser } },
      { new: true }
    );
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
};

//Dis like Post - PATCH
const dislikePost = async (req, res) => {
  //req.params.id => post id that is to be updated
  //req.body.currentUser => user who clicked the dislike button
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { likedBy: req.body.currentUser } },
      { new: true }
    );
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deletePost = async (req, res) => {
  //req.params.id => post id
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id });
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
};

//Get Posts of only users that current user follows
const getFollowedPosts = async (req, res) => {
  //req.body.userIds => Array of users, current user follows

  try {
    const posts = await Post.find({
      userId: { $in: req.body.userIds },
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getThisUsersPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      userId: req.params.userId,
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createPost = createPost;
exports.getPosts = getPosts;
exports.getPost = getPost;
exports.updatePost = updatePost;
exports.likePost = likePost;
exports.dislikePost = dislikePost;
exports.deletePost = deletePost;
exports.getFollowedPosts = getFollowedPosts;
exports.getThisUsersPosts = getThisUsersPosts;
