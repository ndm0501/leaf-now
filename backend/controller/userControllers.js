const User = require("../models/User");
const Bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, verifyPassword, isSellerOrDonor = false } = req.body;

    if (!name || !email || !password || !verifyPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 8 characters" });
    }
    if (password !== verifyPassword) {
      return res.status(400).json({ message: "Passwords must match" });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const salt = await Bcrypt.genSalt(15);
    const hashedPassword = await Bcrypt.hash(password, salt);
    
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isSellerOrDonor: isSellerOrDonor,
    });
    const savedUser = await newUser.save();
    const token = JWT.sign({ id: savedUser._id }, process.env.JWT_SECRET);
    
    req.session.token = token;
    req.session.userId = savedUser._id;

    return res.status(201).json({
      message: "Registered successfully",
      token: token,
      name: savedUser.name,
      email: savedUser.email,
      userId: savedUser._id,
      isSellerOrDonor: savedUser.isSellerOrDonor
    });
  } catch (e) {
    return res.status(500).json({ message: e.message || "Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "User doesn't exist",
      });
    }
    const isPasswordCorrect = await Bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);
    
    req.session.token = token;
    req.session.userId = user._id;

    return res.status(200).json({
      message: "Logged in successfully",
      token: token,
      name: user.name,
      email: user.email,
      userId: user._id,
      isSellerOrDonor: user.isSellerOrDonor,
    });

  } catch (e) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (e) {
    return res.status(500).json({ message: "Server Error" });
  }
}

const signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out"
    });
  } catch (e) {
    // this.next(e);
    return res.status(500).json({
      message: "Something went wrong"
    })
  }
}

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  signout
};
