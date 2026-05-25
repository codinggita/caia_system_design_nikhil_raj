const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    conceptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Concept',
      required: true,
      index: true
    },
    content: {
      type: String,
      required: [true, 'Note content cannot be empty']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Note', noteSchema);
