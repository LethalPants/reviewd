const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Review = require('../models/review');
const editorAuth = require('../middleware/editorAuth');

const storage = multer.diskStorage({
  destination: './public/uploads/reviews',
  filename: function(req, file, cb) {
    cb(null, `${req.body.name}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

router.get('/', async (req, res) => {
  try {
    const rev = await Review.find({}, [], { sort: { rating: -1 } });
    res.json(rev);
    const stat = res.statusCode;
    console.log(stat);
    res.end(stat);
  } catch (e) {
    console.log(e);

    res.status(500).send(e);
  }
});

router.post('/', editorAuth, async (req, res) => {
  const image = `${req.body.name}`;

  console.log(req.body);

  const review = new Review({
    ...req.body,
    image,
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

router.patch('/:id', editorAuth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'name',
    'body',
    'genre',
    'releaseAt',
    'publisher',
    'image',
    'rating'
  ];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const review = await Review.findById(req.params.id);
    updates.forEach(update => (review[update] = req.body[update]));
    await review.save();
    res.send(review);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/:id', editorAuth, async (req, res) => {
  try {
    const review = Review.findById(req.params.id);
    await review.remove();
    res.send(review);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/images', (req, res) => {
  res.sendFile(
    path.dirname(require.main.filename || process.mainModule.filename),
    'public',
    'uploads',
    'reviews',
    req.query.game
  );
});

module.exports = router;
