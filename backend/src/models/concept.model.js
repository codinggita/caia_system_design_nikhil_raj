const mongoose = require('mongoose');

const conceptSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      index: true
    },
    content: {
      type: String,
      required: [true, 'Please provide the content/response'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      index: true
    },
    subcategory: {
      type: String,
      index: true
    },
    tags: {
      type: [String],
      index: true
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      index: true
    },
    designPatterns: {
      type: [String],
      index: true
    },
    supportedLanguages: {
      type: [String],
      index: true
    },
    views: {
      type: Number,
      default: 0,
      index: true
    },
    bookmarks: {
      type: Number,
      default: 0,
      index: true
    },
    questionType: {
      type: String,
      index: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    isArchived: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

// Indexes
// For search
conceptSchema.index({ title: 'text', content: 'text', tags: 'text' });
// For common filters/sorting
conceptSchema.index({ category: 1, difficulty: 1 });
conceptSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Concept', conceptSchema);
