const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const Order = require('../models/orderModel'); // adjust path if needed
router.get('/orders', async(req, res) => {
  try {
    const orders = await Order.find(); // fetch all documents
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/create-checkout-session', async (req, res) => {
  console.log("Received booking request:", req.body);
  try {
    const { lot_id, user_name, from, to, secretKey, amount } = req.body;

    if (!secretKey) return res.status(400).json({ error: "Secret key missing" });
    if (!amount || amount <= 0) return res.status(400).json({ error: "Invalid amount" });

    const stripe = Stripe(secretKey);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Parking Lot ${lot_id} Booking`,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: { lot_id, user_name, from, to },
      success_url: 'http://localhost:5173?payment=success',
      cancel_url: 'http://localhost:5173?payment=cancel',
    });

    // Save order in MongoDB
    const order = new Order({
      lot_id,
      user_name,
      from: new Date(from),
      to: new Date(to),
    });
    await order.save();
    console.log("Order saved:", order);
    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create checkout session or save order' });
  }
});

module.exports = router;
