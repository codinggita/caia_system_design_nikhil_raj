const Concept = require('../models/concept.model');
const paginate = require('../utils/paginate');

const globalSearch = async (q, reqQuery) => {
  const filter = {
    $text: { $search: q },
    isDeleted: false
  };
  return await paginate(Concept, filter, reqQuery);
};

const searchByField = async (field, q, reqQuery) => {
  const filter = {
    [field]: { $regex: q, $options: 'i' },
    isDeleted: false
  };
  return await paginate(Concept, filter, reqQuery);
};

const searchArrayField = async (field, q, reqQuery) => {
  const filter = {
    [field]: { $elemMatch: { $regex: q, $options: 'i' } },
    isDeleted: false
  };
  return await paginate(Concept, filter, reqQuery);
};

const fuzzySearch = async (q, reqQuery) => {
  // Simple fuzzy search using regex allowing up to 1 error or just splitting characters
  // A true fuzzy search in MongoDB requires Atlas Search, but for standard MongoDB we use regex
  const chars = q.split('').join('.*');
  const filter = {
    title: { $regex: chars, $options: 'i' },
    isDeleted: false
  };
  return await paginate(Concept, filter, reqQuery);
};

const autocompleteSearch = async (q) => {
  const filter = {
    title: { $regex: `^${q}`, $options: 'i' },
    isDeleted: false
  };
  const concepts = await Concept.find(filter).select('title').limit(10).lean();
  return concepts.map(c => c.title);
};

const exactSearch = async (q, reqQuery) => {
  const filter = {
    title: q,
    isDeleted: false
  };
  return await paginate(Concept, filter, reqQuery);
};

const regexSearch = async (pattern, reqQuery) => {
  const filter = {
    $or: [
      { title: { $regex: pattern, $options: 'i' } },
      { content: { $regex: pattern, $options: 'i' } }
    ],
    isDeleted: false
  };
  return await paginate(Concept, filter, reqQuery);
};

// Filtering services
const filterByField = async (field, value, reqQuery) => {
  const filter = {
    [field]: new RegExp(`^${value}$`, 'i'),
    isDeleted: false
  };
  return await paginate(Concept, filter, reqQuery);
};

const filterByArray = async (field, listStr, reqQuery) => {
  const values = listStr.split(',').map(v => new RegExp(`^${v.trim()}$`, 'i'));
  const filter = {
    [field]: { $in: values },
    isDeleted: false
  };
  return await paginate(Concept, filter, reqQuery);
};

const filterByDate = async (after, reqQuery) => {
  const filter = {
    createdAt: { $gte: new Date(after) },
    isDeleted: false
  };
  return await paginate(Concept, filter, reqQuery);
};

module.exports = {
  globalSearch,
  searchByField,
  searchArrayField,
  fuzzySearch,
  autocompleteSearch,
  exactSearch,
  regexSearch,
  filterByField,
  filterByArray,
  filterByDate
};
