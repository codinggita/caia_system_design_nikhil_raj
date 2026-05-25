const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    conceptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Concept',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Prevent duplicate bookmarks
bookmarkSchema.index({ userId: 1, conceptId: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);
