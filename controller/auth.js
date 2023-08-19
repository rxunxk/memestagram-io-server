const model = require("../model/user");
const User = model.User;
const bcrypt = require("bcrypt");

//Register - POST
const createUser = async (req, res) => {
  try {
    //Generating new Hashed Password for the user entered password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Creating new user
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });

    //saving new user to the db
    await user.save().then((response) => res.status(201).json(response));
  } catch (err) {
    res.status(400).json(err);
  }
};

//Login - POST
const loginUser = async (req, res) => {
  console.log(req.body);
  try {
    //validating user
    const user = await User.findOne({
      email: req.body.email,
    });
    !user && res.status(404).json("user not found");

    //validating password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("wrong password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createUser = createUser;
exports.loginUser = loginUser;
