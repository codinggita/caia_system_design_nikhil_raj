const conceptService = require('../services/concept.service');
const buildFilter = require('../utils/buildFilter');
const { sendResponse } = require('../utils/apiResponse');

const getAllConcepts = async (req, res) => {
  const filter = buildFilter(req.query);
  const result = await conceptService.getAllConcepts(filter, req.query);
  return sendResponse(res, 200, true, 'Concepts fetched successfully', result.data, result.pagination);
};

const getConceptById = async (req, res) => {
  const data = await conceptService.getConceptById(req.params.id);
  return sendResponse(res, 200, true, 'Concept fetched successfully', data);
};

const createConcept = async (req, res) => {
  const data = await conceptService.createConcept(req.body);
  return sendResponse(res, 201, true, 'Concept created successfully', data);
};

const replaceConcept = async (req, res) => {
  const data = await conceptService.replaceConcept(req.params.id, req.body);
  return sendResponse(res, 200, true, 'Concept replaced successfully', data);
};

const updateConcept = async (req, res) => {
  const data = await conceptService.updateConcept(req.params.id, req.body);
  return sendResponse(res, 200, true, 'Concept updated successfully', data);
};

const deleteConcept = async (req, res) => {
  await conceptService.deleteConcept(req.params.id);
  return sendResponse(res, 200, true, 'Concept deleted successfully', null);
};

const getRandomConcept = async (req, res) => {
  const data = await conceptService.getRandomConcept();
  return sendResponse(res, 200, true, 'Random concept fetched successfully', data);
};

const getLatestConcepts = async (req, res) => {
  const data = await conceptService.getLatestConcepts();
  return sendResponse(res, 200, true, 'Latest concepts fetched successfully', data);
};

const getTrendingConcepts = async (req, res) => {
  const data = await conceptService.getTrendingConcepts();
  return sendResponse(res, 200, true, 'Trending concepts fetched successfully', data);
};

const getPopularConcepts = async (req, res) => {
  const data = await conceptService.getPopularConcepts();
  return sendResponse(res, 200, true, 'Popular concepts fetched successfully', data);
};

const getConceptSummary = async (req, res) => {
  const data = await conceptService.getConceptSummary(req.params.id);
  return sendResponse(res, 200, true, 'Concept summary fetched successfully', data);
};

const getRelatedConcepts = async (req, res) => {
  const data = await conceptService.getRelatedConcepts(req.params.id);
  return sendResponse(res, 200, true, 'Related concepts fetched successfully', data);
};

const archiveConcept = async (req, res) => {
  const data = await conceptService.archiveConcept(req.params.id);
  return sendResponse(res, 200, true, 'Concept archived successfully', data);
};

const restoreConcept = async (req, res) => {
  const data = await conceptService.restoreConcept(req.params.id);
  return sendResponse(res, 200, true, 'Concept restored successfully', data);
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
