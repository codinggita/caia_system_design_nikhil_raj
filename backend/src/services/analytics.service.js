const Concept = require('../models/concept.model');

const getTotalConcepts = async () => {
  return await Concept.countDocuments({ isDeleted: false });
};

const getCategoryDistribution = async () => {
  return await Concept.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
};

const getDifficultyStats = async () => {
  return await Concept.aggregate([
    { $match: { isDeleted: false, difficulty: { $exists: true, $ne: null } } },
    { $group: { _id: '$difficulty', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
};

const getTopPatterns = async () => {
  return await Concept.aggregate([
    { $match: { isDeleted: false } },
    { $unwind: '$designPatterns' },
    { $group: { _id: '$designPatterns', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);
};

const getTopLanguages = async () => {
  return await Concept.aggregate([
    { $match: { isDeleted: false } },
    { $unwind: '$supportedLanguages' },
    { $group: { _id: '$supportedLanguages', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);
};

const getTopViews = async () => {
  return await Concept.find({ isDeleted: false })
    .sort({ views: -1 })
    .limit(10)
    .select('title category views bookmarks');
};

const getTopBookmarks = async () => {
  return await Concept.find({ isDeleted: false })
    .sort({ bookmarks: -1 })
    .limit(10)
    .select('title category views bookmarks');
};

const getTrending = async () => {
  // Can be a combination of views and recent creation, or simply views
  return await Concept.find({ isDeleted: false })
    .sort({ views: -1, createdAt: -1 })
    .limit(10)
    .select('title category views createdAt');
};

module.exports = {
  getTotalConcepts,
  getCategoryDistribution,
  getDifficultyStats,
  getTopPatterns,
  getTopLanguages,
  getTopViews,
  getTopBookmarks,
  getTrending
};
