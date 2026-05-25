/**
 * Builds a dynamic Mongoose filter object based on request query parameters.
 * @param {Object} queryParams - req.query object
 * @returns {Object} Mongoose filter object
 */
const buildFilter = (queryParams) => {
  const filter = { isDeleted: false }; // Always exclude soft-deleted records

  // Extract common query parameters
  const {
    category,
    difficulty,
    pattern,
    language,
    tags, // comma-separated
    after, // Date filter for createdAt (e.g. 2025-01-01)
  } = queryParams;

  if (category) {
    // Case-insensitive exact match
    filter.category = new RegExp(`^${category}$`, 'i');
  }

  if (difficulty) {
    filter.difficulty = difficulty.toLowerCase();
  }

  if (pattern) {
    // Check if the pattern exists in the designPatterns array
    filter.designPatterns = new RegExp(`^${pattern}$`, 'i');
  }

  if (language) {
    filter.supportedLanguages = new RegExp(`^${language}$`, 'i');
  }

  if (tags) {
    // Tags is expected to be a comma-separated list like 'redis,kafka'
    const tagsArray = tags.split(',').map((t) => new RegExp(`^${t.trim()}$`, 'i'));
    // Match any of the tags
    filter.tags = { $in: tagsArray };
  }

  if (after) {
    const afterDate = new Date(after);
    if (!isNaN(afterDate.getTime())) {
      filter.createdAt = { $gte: afterDate };
    }
  }

  return filter;
};

module.exports = buildFilter;
