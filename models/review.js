const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name can't be empty"]
    },
    body: {
      type: String,
      required: [true, "Body can't be empty"],
      select: false
    },
    genre: {
      type: String,
      required: [true, "Genre can't be empty"]
    },
    releaseAt: {
      type: String,
      required: [true, "Release date can't be empty"]
    },
    publisher: {
      type: String,
      required: [true, "Publisher can't be empty"]
    },
    image: {
      type: String
    },
    rating: {
      type: Number,
      default: 1
    },
    edited: {
      type: Boolean,
      default: 0
    },
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      username: String
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
      }
    ]
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('Reviews', ReviewSchema);
