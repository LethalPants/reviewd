const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema(
  {
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      username: String
    },
    body: String
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('Comment', commentSchema);
