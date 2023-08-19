const model = require("../model/user");
const User = model.User;
const bcrypt = require("bcrypt");

//Get a Single User
const getUser = async (req, res) => {
  try {
    await User.findById(req.params.id)
      .exec()
      .then((response) => res.status(200).json(response));
  } catch (err) {
    res.status(400).json(err);
  }
};

//Get All Users
const getAllUsers = async (req, res) => {
  try {
    await User.find().then((response) => res.status(200).json(response));
  } catch (err) {
    res.status(400).json(err);
  }
};

//Update User
const updateUser = async (req, res) => {
  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } catch (err) {
      console.log(err);
    }
  }
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

//Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

//follow a user
const followUser = async (req, res) => {
  //req.params.id => User To be followed
  //req.body.currentUser => current user who clicked follow
  try {
    const currentUser = await User.updateOne(
      { _id: req.body.currentUser },
      { $push: { following: req.params.id } }
    );
    const toBeFollowedUser = await User.updateOne(
      { _id: req.params.id },
      {
        $push: { followers: req.body.currentUser },
      }
    );
    if (!currentUser && !toBeFollowedUser) {
      res.status(400).json("error occured");
    }
    res.status(200).json({ currentUser, toBeFollowedUser });
  } catch (err) {
    res.status(400).json(err);
  }
};

//Unfollow a user
const unFollowUser = async (req, res) => {
  //req.params.id => User To be unFollowed
  //req.body.currentUser => current user who clicked unFollow
  try {
    const currentUser = await User.updateOne(
      { _id: req.body.currentUser },
      { $pull: { following: req.params.id } }
    );
    const toBeUnFollowedUser = await User.updateOne(
      { _id: req.params.id },
      {
        $pull: { followers: req.body.currentUser },
      }
    );
    if (!currentUser && !toBeUnFollowedUser) {
      res.status(400).json("error occured");
    }
    res.status(200).json({ currentUser, toBeUnFollowedUser });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getAllUsers = getAllUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.followUser = followUser;
exports.unFollowUser = unFollowUser;
