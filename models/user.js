const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Comments = require('./comment');
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username can't be blank"],
      match: [/^[a-zA-Z0-9_-]+$/, 'Username is invalid'],
      unique: true
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "Email can't be blank"],
      match: [/\S+@\S+\.\S+/, 'Email is invalid'],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Password can't be blank"]
    },
    profile: {
      type: String,
      default: 'profile_img.jpg'
    },
    type: {
      type: String,
      default: 'user',
      match: [/user|admin|editor/, 'Type is invalid']
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

UserSchema.statics.uniqueUser = async (email, username) => {
  await this.findOne({ email }, (err, User) => {
    if (!err || User) {
      throw new Error('User already exists');
    }
  });
  await this.findOne({ username }, (err, User) => {
    if (!err || User) {
      throw new Error('User already exists');
    }
  });
  return true;
};

UserSchema.pre('save', async function(next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

UserSchema.pre('remove', async function(next) {
  const user = this;
  await Comments.deleteMany({ owner: user._id });
  next();
});
module.exports = mongoose.model('Users', UserSchema);
