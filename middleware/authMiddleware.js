const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Signup = require("../models/signUpModel");

// Middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Check if the authorization header exists and has the 'Bearer' format
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2. Extract the token from the header
      token = req.headers.authorization.split(" ")[1];

      // 3. Verify the token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find the user associated with the token and attach it to the request
      req.user = await Signup.findById(decoded.id).select("-password");

      // 5. Move to the next middleware or route handler
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  // If the authorization header was missing or malformed
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = protect;