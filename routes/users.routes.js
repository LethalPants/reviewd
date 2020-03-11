const User = require('../models/user');
const express = require('express');
const auth = require('../middleware/auth');
const multer = require('multer');
const router = express.Router();
const path = require('path');

const storage = multer.diskStorage({
  destination: './public/uploads/users',
  filename: function(req, file, cb) {
    cb(null, `${req.body.username}${path.extname(file.originalname)}`);
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

router.post('/register', upload.single('avatar'), async (req, res) => {
  const profile = req.file
    ? `${req.body.username}${path.extname(req.file.originalname)}`
    : 'profile_img.jpg';
  const user = new User({
    ...req.body,
    profile
  });
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ sucess: 'true', user, token });
  } catch (err) {
    console.log(err);
    res.status(400).send({ sucess: 'false', err });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/me', auth, async (req, res) => {
  res.send(req.user);
});

router.get('/me/avatar', auth, async (req, res) => {
  res.sendFile(
    path.resolve(
      path.dirname(require.main.filename || process.mainModule.filename),
      'public',
      'uploads',
      'users',
      req.user.profile
    )
  );
});

router.get('/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set('Content-Type', 'image/png');
    res.sendFile(
      path.resolve(
        path.dirname(require.main.filename || process.mainModule.filename),
        'public',
        'uploads',
        'users',
        user.profile
      )
    );
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
