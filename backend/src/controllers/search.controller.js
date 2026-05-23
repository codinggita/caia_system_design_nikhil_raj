const searchService = require('../services/search.service');
const { sendResponse } = require('../utils/apiResponse');

// SEARCH CONTROLLERS
const globalSearch = async (req, res) => {
  const { q } = req.query;
  const result = await searchService.globalSearch(q, req.query);
  return sendResponse(res, 200, true, 'Search results fetched', result.data, result.pagination);
};

const searchTitle = async (req, res) => {
  const result = await searchService.searchByField('title', req.query.q, req.query);
  return sendResponse(res, 200, true, 'Search results fetched', result.data, result.pagination);
};

const searchContent = async (req, res) => {
  const result = await searchService.searchByField('content', req.query.q, req.query);
  return sendResponse(res, 200, true, 'Search results fetched', result.data, result.pagination);
};

const searchTags = async (req, res) => {
  const result = await searchService.searchArrayField('tags', req.query.q, req.query);
  return sendResponse(res, 200, true, 'Search results fetched', result.data, result.pagination);
};

const searchPatterns = async (req, res) => {
  const result = await searchService.searchArrayField('designPatterns', req.query.q, req.query);
  return sendResponse(res, 200, true, 'Search results fetched', result.data, result.pagination);
};

const searchLanguage = async (req, res) => {
  const result = await searchService.searchArrayField('supportedLanguages', req.query.q, req.query);
  return sendResponse(res, 200, true, 'Search results fetched', result.data, result.pagination);
};

const searchCategory = async (req, res) => {
  const result = await searchService.searchByField('category', req.query.q, req.query);
  return sendResponse(res, 200, true, 'Search results fetched', result.data, result.pagination);
};

const searchDifficulty = async (req, res) => {
  const result = await searchService.searchByField('difficulty', req.query.q, req.query);
  return sendResponse(res, 200, true, 'Search results fetched', result.data, result.pagination);
};

const searchFuzzy = async (req, res) => {
  const result = await searchService.fuzzySearch(req.query.q, req.query);
  return sendResponse(res, 200, true, 'Search results fetched', result.data, result.pagination);
};

const searchAutocomplete = async (req, res) => {
  const data = await searchService.autocompleteSearch(req.query.q);
  return sendResponse(res, 200, true, 'Autocomplete results fetched', data);
};

const searchExact = async (req, res) => {
  const result = await searchService.exactSearch(req.query.q, req.query);
  return sendResponse(res, 200, true, 'Search results fetched', result.data, result.pagination);
};

const searchRegex = async (req, res) => {
  const result = await searchService.regexSearch(req.query.pattern, req.query);
  return sendResponse(res, 200, true, 'Search results fetched', result.data, result.pagination);
};


// FILTER CONTROLLERS
const filterCategory = async (req, res) => {
  const result = await searchService.filterByField('category', req.query.name, req.query);
  return sendResponse(res, 200, true, 'Filtered results fetched', result.data, result.pagination);
};

const filterDifficulty = async (req, res) => {
  const result = await searchService.filterByField('difficulty', req.query.level, req.query);
  return sendResponse(res, 200, true, 'Filtered results fetched', result.data, result.pagination);
};

const filterPattern = async (req, res) => {
  const result = await searchService.filterByArray('designPatterns', req.query.name, req.query);
  return sendResponse(res, 200, true, 'Filtered results fetched', result.data, result.pagination);
};

const filterLanguage = async (req, res) => {
  const result = await searchService.filterByArray('supportedLanguages', req.query.name, req.query);
  return sendResponse(res, 200, true, 'Filtered results fetched', result.data, result.pagination);
};

const filterDate = async (req, res) => {
  const result = await searchService.filterByDate(req.query.after, req.query);
  return sendResponse(res, 200, true, 'Filtered results fetched', result.data, result.pagination);
};

const filterTags = async (req, res) => {
  const result = await searchService.filterByArray('tags', req.query.list, req.query);
  return sendResponse(res, 200, true, 'Filtered results fetched', result.data, result.pagination);
};

const filterExpertOnly = async (req, res) => {
  const result = await searchService.filterByField('difficulty', 'expert', req.query);
  return sendResponse(res, 200, true, 'Filtered results fetched', result.data, result.pagination);
};

const filterFrontend = async (req, res) => {
  const result = await searchService.filterByField('category', 'frontend', req.query);
  return sendResponse(res, 200, true, 'Filtered results fetched', result.data, result.pagination);
};

const filterBackend = async (req, res) => {
  const result = await searchService.filterByField('category', 'backend', req.query);
  return sendResponse(res, 200, true, 'Filtered results fetched', result.data, result.pagination);
};

const filterDevops = async (req, res) => {
  const result = await searchService.filterByField('category', 'devops', req.query);
  return sendResponse(res, 200, true, 'Filtered results fetched', result.data, result.pagination);
};

const filterCloud = async (req, res) => {
  const result = await searchService.filterByField('category', 'cloud', req.query);
  return sendResponse(res, 200, true, 'Filtered results fetched', result.data, result.pagination);
};


module.exports = {
  globalSearch,
  searchTitle,
  searchContent,
  searchTags,
  searchPatterns,
  searchLanguage,
  searchCategory,
  searchDifficulty,
  searchFuzzy,
  searchAutocomplete,
  searchExact,
  searchRegex,
  
  filterCategory,
  filterDifficulty,
  filterPattern,
  filterLanguage,
  filterDate,
  filterTags,
  filterExpertOnly,
  filterFrontend,
  filterBackend,
  filterDevops,
  filterCloud
};
