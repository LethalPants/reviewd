const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "can't be empty"]
    },
    description: {
      type: String,
      required: [true, "can't be empty"]
    },
    genre: {
      type: String,
      required: [true, "can't be empty"]
    },
    releaseAt: {
      type: String,
      required: [true, "can't be empty"]
    },
    publisher: {
      type: String,
      required: [true, "can't be empty"]
    },
    edited: {
      type: Boolean
    },
    image: {
      type: String,
      required: [true, "can't be empty"]
    },
    rating: {
      type: Number
    },
    review: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review'
      }
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('Games', GameSchema);
