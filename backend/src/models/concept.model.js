const mongoose = require('mongoose');

const conceptSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a concept title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add content for the concept']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    trim: true
  },
  subcategory: {
    type: String,
    trim: true,
    default: ''
  },
  tags: {
    type: [String],
    default: []
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    default: 'intermediate'
  },
  designPatterns: {
    type: [String],
    default: []
  },
  supportedLanguages: {
    type: [String],
    default: []
  },
  questionType: {
    type: String,
    default: 'general'
  },
  views: {
    type: Number,
    default: 0
  },
  bookmarks: {
    type: Number,
    default: 0
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isArchived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for text search
conceptSchema.index({
  title: 'text',
  content: 'text',
  tags: 'text'
});

// Other indexes for performance
conceptSchema.index({ category: 1, isDeleted: 1 });
conceptSchema.index({ views: -1, isDeleted: 1 });
conceptSchema.index({ bookmarks: -1, isDeleted: 1 });

module.exports = mongoose.model('Concept', conceptSchema);
