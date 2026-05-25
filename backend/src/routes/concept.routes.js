const express = require('express');
const router = express.Router();
const conceptController = require('../controllers/concept.controller');
const asyncWrapper = require('../utils/asyncWrapper');
const { protect } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');

// Special routes
router.get('/random', asyncWrapper(conceptController.getRandomConcept));
router.get('/latest', asyncWrapper(conceptController.getLatestConcepts));
router.get('/trending', asyncWrapper(conceptController.getTrendingConcepts));
router.get('/popular', asyncWrapper(conceptController.getPopularConcepts));

// Specific concept operations
router.get('/:id/summary', asyncWrapper(conceptController.getConceptSummary));
router.get('/:id/related', asyncWrapper(conceptController.getRelatedConcepts));
router.patch('/:id/archive', protect, authorize('admin'), asyncWrapper(conceptController.archiveConcept));
router.patch('/:id/restore', protect, authorize('admin'), asyncWrapper(conceptController.restoreConcept));

// Standard CRUD operations
router.route('/')
  .get(asyncWrapper(conceptController.getAllConcepts))
  .post(protect, authorize('admin'), asyncWrapper(conceptController.createConcept));

router.route('/:id')
  .get(asyncWrapper(conceptController.getConceptById))
  .put(protect, authorize('admin'), asyncWrapper(conceptController.replaceConcept))
  .patch(protect, authorize('admin'), asyncWrapper(conceptController.updateConcept))
  .delete(protect, authorize('admin'), asyncWrapper(conceptController.deleteConcept));

module.exports = router;
