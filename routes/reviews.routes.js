const express = require('express');
const router = express.Router();
const Review = require('../models/review');

router.get('/', async (req, res) => {
  try {
    const rev = await Review.find({});
    res.status(200).json(rev);
  } catch (e) {
    console.err(e);
    res.status(500).send(e);
  }
});

router.post('/', async (req, res) => {
  const review = new Review({
    ...req.body
  });
  try {
    await review.save();
    res.status(201).send({ success: 'true', review });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
