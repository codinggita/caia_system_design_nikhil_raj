const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.controller');
const asyncWrapper = require('../utils/asyncWrapper');

// Base route: /api/v1/search
router.get('/', asyncWrapper(searchController.globalSearch));
router.get('/title', asyncWrapper(searchController.searchTitle));
router.get('/content', asyncWrapper(searchController.searchContent));
router.get('/tags', asyncWrapper(searchController.searchTags));
router.get('/patterns', asyncWrapper(searchController.searchPatterns));
router.get('/language', asyncWrapper(searchController.searchLanguage));
router.get('/category', asyncWrapper(searchController.searchCategory));
router.get('/difficulty', asyncWrapper(searchController.searchDifficulty));
router.get('/fuzzy', asyncWrapper(searchController.searchFuzzy));
router.get('/autocomplete', asyncWrapper(searchController.searchAutocomplete));
router.get('/exact', asyncWrapper(searchController.searchExact));
router.get('/regex', asyncWrapper(searchController.searchRegex));

module.exports = router;
