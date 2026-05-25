const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');
const asyncWrapper = require('../utils/asyncWrapper');

router.get('/total-concepts', asyncWrapper(analyticsController.getTotalConcepts));
router.get('/category-distribution', asyncWrapper(analyticsController.getCategoryDistribution));
router.get('/difficulty-stats', asyncWrapper(analyticsController.getDifficultyStats));
router.get('/patterns/top', asyncWrapper(analyticsController.getTopPatterns));
router.get('/languages/top', asyncWrapper(analyticsController.getTopLanguages));
router.get('/views/top', asyncWrapper(analyticsController.getTopViews));
router.get('/bookmarks/top', asyncWrapper(analyticsController.getTopBookmarks));
router.get('/trending', asyncWrapper(analyticsController.getTrending));

module.exports = router;
