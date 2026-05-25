const Concept = require('../models/concept.model');
const paginate = require('../utils/paginate');

const getUniqueValues = async (field) => {
  return await Concept.distinct(field, { isDeleted: false });
};

const getConceptsByField = async (field, value, reqQuery) => {
  const filter = { [field]: new RegExp(`^${value}$`, 'i'), isDeleted: false };
  return await paginate(Concept, filter, reqQuery);
};

const getConceptsByArrayField = async (field, value, reqQuery) => {
  const filter = { [field]: { $in: [new RegExp(`^${value}$`, 'i')] }, isDeleted: false };
  return await paginate(Concept, filter, reqQuery);
};

module.exports = {
  getUniqueValues,
  getConceptsByField,
  getConceptsByArrayField
};
