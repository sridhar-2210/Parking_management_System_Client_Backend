const express = require("express");
const { loginUser } = require("../controllers/loginController");

const router = express.Router();

// @route   POST /api/login
// @desc    Authenticate user (login)
// @access  Public
router.post("/", loginUser);

module.exports = router;
