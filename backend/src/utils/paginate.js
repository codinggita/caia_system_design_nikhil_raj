/**
 * Reusable pagination utility for Mongoose queries
 * @param {Object} model - Mongoose model
 * @param {Object} filter - Query filter
 * @param {Object} reqQuery - The req.query object containing page, limit, sort
 * @param {String|Object} populate - Optional populate config
 * @returns {Object} { data, pagination }
 */
const paginate = async (model, filter = {}, reqQuery = {}, populate = null) => {
  // Parse page and limit
  const page = parseInt(reqQuery.page, 10) || 1;
  const limit = parseInt(reqQuery.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  // Build the initial query (lean for performance)
  let query = model.find(filter).lean();

  // Sorting
  if (reqQuery.sort) {
    const sortBy = reqQuery.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    // Default sort by newest
    query = query.sort('-createdAt');
  }

  // Populate if provided
  if (populate) {
    query = query.populate(populate);
  }

  // Execute pagination
  query = query.skip(startIndex).limit(limit);

  // Run query in parallel with counting total
  const [data, total] = await Promise.all([
    query.exec(),
    model.countDocuments(filter)
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages
    }
  };
};

module.exports = paginate;
