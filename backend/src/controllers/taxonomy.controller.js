const taxonomyService = require('../services/taxonomy.service');
const { sendResponse } = require('../utils/apiResponse');

const getCategories = async (req, res) => {
  const data = await taxonomyService.getUniqueValues('category');
  return sendResponse(res, 200, true, 'Categories fetched successfully', data);
};

const getCategoryConcepts = async (req, res) => {
  const result = await taxonomyService.getConceptsByField('category', req.params.category, req.query);
  return sendResponse(res, 200, true, 'Concepts fetched successfully', result.data, result.pagination);
};

const getSubcategories = async (req, res) => {
  const data = await taxonomyService.getUniqueValues('subcategory');
  return sendResponse(res, 200, true, 'Subcategories fetched successfully', data);
};

const getTags = async (req, res) => {
  const data = await taxonomyService.getUniqueValues('tags');
  return sendResponse(res, 200, true, 'Tags fetched successfully', data);
};

const getTagConcepts = async (req, res) => {
  const result = await taxonomyService.getConceptsByArrayField('tags', req.params.tag, req.query);
  return sendResponse(res, 200, true, 'Concepts fetched successfully', result.data, result.pagination);
};

const getPatterns = async (req, res) => {
  const data = await taxonomyService.getUniqueValues('designPatterns');
  return sendResponse(res, 200, true, 'Design patterns fetched successfully', data);
};

const getPatternConcepts = async (req, res) => {
  const result = await taxonomyService.getConceptsByArrayField('designPatterns', req.params.patternName, req.query);
  return sendResponse(res, 200, true, 'Concepts fetched successfully', result.data, result.pagination);
};

const getLanguages = async (req, res) => {
  const data = await taxonomyService.getUniqueValues('supportedLanguages');
  return sendResponse(res, 200, true, 'Languages fetched successfully', data);
};

const getLanguageConcepts = async (req, res) => {
  const result = await taxonomyService.getConceptsByArrayField('supportedLanguages', req.params.language, req.query);
  return sendResponse(res, 200, true, 'Concepts fetched successfully', result.data, result.pagination);
};

const getDifficulty = async (req, res) => {
  const data = await taxonomyService.getUniqueValues('difficulty');
  return sendResponse(res, 200, true, 'Difficulty levels fetched successfully', data);
};

const getDifficultyConcepts = async (req, res) => {
  const result = await taxonomyService.getConceptsByField('difficulty', req.params.level, req.query);
  return sendResponse(res, 200, true, 'Concepts fetched successfully', result.data, result.pagination);
};

const getQuestionTypes = async (req, res) => {
  const data = await taxonomyService.getUniqueValues('questionType');
  return sendResponse(res, 200, true, 'Question types fetched successfully', data);
};

const getQuestionTypeConcepts = async (req, res) => {
  const result = await taxonomyService.getConceptsByField('questionType', req.params.type, req.query);
  return sendResponse(res, 200, true, 'Concepts fetched successfully', result.data, result.pagination);
};

const getMicroservices = async (req, res) => {
  const result = await taxonomyService.getConceptsByField('category', 'microservices', req.query);
  return sendResponse(res, 200, true, 'Microservices concepts fetched successfully', result.data, result.pagination);
};

module.exports = {
  getCategories,
  getCategoryConcepts,
  getSubcategories,
  getTags,
  getTagConcepts,
  getPatterns,
  getPatternConcepts,
  getLanguages,
  getLanguageConcepts,
  getDifficulty,
  getDifficultyConcepts,
  getQuestionTypes,
  getQuestionTypeConcepts,
  getMicroservices
};
