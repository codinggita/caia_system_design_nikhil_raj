const analyticsService = require('../services/analytics.service');
const { sendResponse } = require('../utils/apiResponse');

const getTotalConcepts = async (req, res) => {
  const data = await analyticsService.getTotalConcepts();
  return sendResponse(res, 200, true, 'Total concepts count fetched', { total: data });
};

const getCategoryDistribution = async (req, res) => {
  const data = await analyticsService.getCategoryDistribution();
  return sendResponse(res, 200, true, 'Category distribution fetched', data);
};

const getDifficultyStats = async (req, res) => {
  const data = await analyticsService.getDifficultyStats();
  return sendResponse(res, 200, true, 'Difficulty stats fetched', data);
};

const getTopPatterns = async (req, res) => {
  const data = await analyticsService.getTopPatterns();
  return sendResponse(res, 200, true, 'Top patterns fetched', data);
};

const getTopLanguages = async (req, res) => {
  const data = await analyticsService.getTopLanguages();
  return sendResponse(res, 200, true, 'Top languages fetched', data);
};

const getTopViews = async (req, res) => {
  const data = await analyticsService.getTopViews();
  return sendResponse(res, 200, true, 'Top viewed concepts fetched', data);
};

const getTopBookmarks = async (req, res) => {
  const data = await analyticsService.getTopBookmarks();
  return sendResponse(res, 200, true, 'Top bookmarked concepts fetched', data);
};

const getTrending = async (req, res) => {
  const data = await analyticsService.getTrending();
  return sendResponse(res, 200, true, 'Trending analytics fetched', data);
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
