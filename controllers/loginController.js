const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Signup = require("../models/signUpModel");
const generateToken = require("../utils/generateToken");

// @desc    Authenticate user (login)
// @route   POST /api/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  // find user
  const user = await Signup.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Invalid email");
  }

  // check password
  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    res.status(200).json({
      _id: user.id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user.id), // 🔑 send JWT
    });
  } else {
    res.status(401);
    throw new Error("Invalid password");
  }
});

module.exports = { loginUser };
