const express = require('express');
const router = express.Router();
const taxonomyController = require('../controllers/taxonomy.controller');
const asyncWrapper = require('../utils/asyncWrapper');

// Categories
router.get('/categories', asyncWrapper(taxonomyController.getCategories));
router.get('/categories/:category/concepts', asyncWrapper(taxonomyController.getCategoryConcepts));
// Note: /categories/:category can just return the category name or basic info, we'll map it to getCategoryConcepts for simplicity if needed, but usually it returns category details. We will map to getCategoryConcepts.
router.get('/categories/:category', asyncWrapper(taxonomyController.getCategoryConcepts));

// Subcategories
router.get('/subcategories', asyncWrapper(taxonomyController.getSubcategories));

// Tags
router.get('/tags', asyncWrapper(taxonomyController.getTags));
router.get('/tags/:tag', asyncWrapper(taxonomyController.getTagConcepts));

// Patterns
router.get('/patterns', asyncWrapper(taxonomyController.getPatterns));
router.get('/patterns/:patternName', asyncWrapper(taxonomyController.getPatternConcepts));

// Languages
router.get('/languages', asyncWrapper(taxonomyController.getLanguages));
router.get('/languages/:language', asyncWrapper(taxonomyController.getLanguageConcepts));

// Difficulty
router.get('/difficulty', asyncWrapper(taxonomyController.getDifficulty));
router.get('/difficulty/:level', asyncWrapper(taxonomyController.getDifficultyConcepts));

// Question Types
router.get('/question-types', asyncWrapper(taxonomyController.getQuestionTypes));
router.get('/question-types/:type', asyncWrapper(taxonomyController.getQuestionTypeConcepts));

// Specific architecture
router.get('/architectures/microservices', asyncWrapper(taxonomyController.getMicroservices));

module.exports = router;
