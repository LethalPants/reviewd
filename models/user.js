const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Can't be blank"],
      match: [/^[a-zA-Z0-9_-]+$/, 'is invalid'],
      index: true
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true
    },
    password: {
      type: String,
      required: [true, "can't be blank"]
    },
    image: {
      type: String,
      default: 'profile_img.jpg'
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('Users', UserSchema);
