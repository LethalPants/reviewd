const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const editorAuth = require('../middleware/editorAuth');

router.get('/', async (req, res) => {
  try {
    const rev = await Review.find({});
    res.status(200).json(rev);
  } catch (e) {
    console.err(e);
    res.status(500).send(e);
  }
});

router.post('/', editorAuth, async (req, res) => {
  const review = new Review({
    ...req.body,
    author: {
      id: req.user._id,
      username: req.user.username
    }
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
