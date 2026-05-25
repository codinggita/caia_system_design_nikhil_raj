const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema(
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
    },
    voteType: {
      type: String,
      enum: ['up', 'down'],
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Prevent multiple votes per concept by the same user
voteSchema.index({ userId: 1, conceptId: 1 }, { unique: true });

module.exports = mongoose.model('Vote', voteSchema);
