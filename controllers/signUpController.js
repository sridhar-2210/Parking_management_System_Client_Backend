const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Signup = require("../models/signUpModel");
const generateToken = require("../utils/generateToken");

// @desc    Register new user (signup)
// @route   POST /api/signup
// @access  Public
const signupUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // check if user exists
  const userExists = await Signup.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists with this email");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await Signup.create({
    fullName,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user.id), 
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

module.exports = { signupUser };
