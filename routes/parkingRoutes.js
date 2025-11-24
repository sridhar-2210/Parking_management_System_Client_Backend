const express = require("express");
const router = express.Router();
// Import your new authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

// Apply the authMiddleware to all routes in this file
// This ensures that only authenticated users can access them
router.use(authMiddleware);

// Example protected GET route for fetching parking slots
router.get("/", (req, res) => {
    // This code will only execute if the authMiddleware successfully validated the token.
    console.log("User authorized:", req.user);
    res.status(200).json({ message: "Access granted to parking slots" });
});

// Example protected POST route for booking
router.post("/book", (req, res) => {
    // Similarly, this route is also protected by the middleware.
    res.status(200).json({ message: "Booking successful" });
});

module.exports = router;