const Concept = require('../models/concept.model');
const paginate = require('../utils/paginate');

const getAllConcepts = async (filter, reqQuery) => {
  return await paginate(Concept, filter, reqQuery);
};

const getConceptById = async (id) => {
  const concept = await Concept.findOne({ _id: id, isDeleted: false });
  if (!concept) {
    throw new Error('Concept not found');
  }
  // Increment view count asynchronously
  Concept.findByIdAndUpdate(id, { $inc: { views: 1 } }).exec();
  return concept;
};

const createConcept = async (data) => {
  return await Concept.create(data);
};

const replaceConcept = async (id, data) => {
  const concept = await Concept.findOneAndUpdate({ _id: id, isDeleted: false }, data, {
    new: true,
    overwrite: true,
    runValidators: true
  });
  if (!concept) {
    throw new Error('Concept not found');
  }
  return concept;
};

const updateConcept = async (id, data) => {
  const concept = await Concept.findOneAndUpdate({ _id: id, isDeleted: false }, data, {
    new: true,
    runValidators: true
  });
  if (!concept) {
    throw new Error('Concept not found');
  }
  return concept;
};

const deleteConcept = async (id) => {
  const concept = await Concept.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );
  if (!concept) {
    throw new Error('Concept not found');
  }
  return concept;
};

const getRandomConcept = async () => {
  const count = await Concept.countDocuments({ isDeleted: false });
  const random = Math.floor(Math.random() * count);
  const concept = await Concept.findOne({ isDeleted: false }).skip(random);
  return concept;
};

const getLatestConcepts = async () => {
  return await Concept.find({ isDeleted: false }).sort('-createdAt').limit(10);
};

const getTrendingConcepts = async () => {
  return await Concept.find({ isDeleted: false }).sort('-views').limit(10);
};

const getPopularConcepts = async () => {
  return await Concept.find({ isDeleted: false }).sort('-bookmarks').limit(10);
};

const getConceptSummary = async (id) => {
  const concept = await Concept.findOne({ _id: id, isDeleted: false }).select('title category tags');
  if (!concept) {
    throw new Error('Concept not found');
  }
  return concept;
};

const getRelatedConcepts = async (id) => {
  const concept = await Concept.findOne({ _id: id, isDeleted: false });
  if (!concept) {
    throw new Error('Concept not found');
  }
  
  const related = await Concept.find({
    category: concept.category,
    _id: { $ne: id },
    isDeleted: false
  }).limit(5);

  return related;
};

const archiveConcept = async (id) => {
  const concept = await Concept.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isArchived: true },
    { new: true }
  );
  if (!concept) {
    throw new Error('Concept not found');
  }
  return concept;
};

const restoreConcept = async (id) => {
  const concept = await Concept.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isArchived: false },
    { new: true }
  );
  if (!concept) {
    throw new Error('Concept not found');
  }
  return concept;
};

module.exports = {
  getAllConcepts,
  getConceptById,
  createConcept,
  replaceConcept,
  updateConcept,
  deleteConcept,
  getRandomConcept,
  getLatestConcepts,
  getTrendingConcepts,
  getPopularConcepts,
  getConceptSummary,
  getRelatedConcepts,
  archiveConcept,
  restoreConcept
};
