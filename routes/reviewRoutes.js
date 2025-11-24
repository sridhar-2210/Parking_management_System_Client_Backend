const express = require('express');
const router = express.Router();
const Reviews= require('../models/reviewModel');
router.get('/', async (req, res) => {
  const lotId = req.query.lot_id; // <-- query, not params
  if (!lotId) return res.status(400).json({ message: "lot_id is required" });

  try {
    const reviews = await Reviews.find({ lot_id: lotId });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const { user_name, rating, comment,lot_id } = req.body;
    if (!user_name || !rating || !comment || !lot_id) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newReview = new Reviews({ user_name, rating, comment,lot_id });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit review" });
  }
});
module.exports = router;