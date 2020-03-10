const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "can't be empty"]
    },
    body: {
      type: String,
      required: [true, "can't be empty"]
    },
    edited: {
      type: Boolean
    },
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      username: String
    },
    game: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'game'
      }
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
