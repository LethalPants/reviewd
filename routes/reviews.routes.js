const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const Review = require('../models/review');
const editorAuth = require('../middleware/editorAuth');

const upload = multer({
  limits: { fileSize: 5000000 },
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
    const rev = await Review.find({}, [], { sort: { rating: -1 } }).select([
      '-body'
    ]);
    res.json(rev);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const rev = await Review.findById(req.params.id);
    res.json(rev);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/image', async (req, res) => {
  res.sendFile(
    path.resolve(
      path.dirname(require.main.filename || process.mainModule.filename),
      'public',
      'uploads',
      'users',
      req.query.name
    )
  );
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

// router.get('/image' async (req,res)=> {

// })

router.post(
  '/image',
  editorAuth,
  upload.single('gameImage'),
  async (req, res) => {
    try {
      const review = await Review.findById(req.query._id);
      const buffer = await sharp(req.file.buffer).toBuffer();
      review.image = buffer;
      await review.save();
      res.status(204).send(review);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
);

module.exports = router;
