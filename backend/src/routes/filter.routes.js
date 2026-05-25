const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.controller');
const conceptController = require('../controllers/concept.controller');
const asyncWrapper = require('../utils/asyncWrapper');

// Base route: /api/v1/filter
router.get('/category', asyncWrapper(searchController.filterCategory));
router.get('/difficulty', asyncWrapper(searchController.filterDifficulty));
router.get('/pattern', asyncWrapper(searchController.filterPattern));
router.get('/language', asyncWrapper(searchController.filterLanguage));
router.get('/date', asyncWrapper(searchController.filterDate));
router.get('/tags', asyncWrapper(searchController.filterTags));
router.get('/expert-only', asyncWrapper(searchController.filterExpertOnly));
router.get('/frontend', asyncWrapper(searchController.filterFrontend));
router.get('/backend', asyncWrapper(searchController.filterBackend));
router.get('/devops', asyncWrapper(searchController.filterDevops));
router.get('/cloud', asyncWrapper(searchController.filterCloud));

// Trending and popular map to conceptController
router.get('/trending', asyncWrapper(conceptController.getTrendingConcepts));
router.get('/popular', asyncWrapper(conceptController.getPopularConcepts));

module.exports = router;
