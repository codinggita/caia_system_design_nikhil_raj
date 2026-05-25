const express = require('express');
const router = express.Router();
const bulkController = require('../controllers/bulk.controller');
const asyncWrapper = require('../utils/asyncWrapper');
const { protect } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');

// All bulk routes require admin role
router.use(protect, authorize('admin'));

router.post('/create', asyncWrapper(bulkController.bulkCreate));
router.patch('/update', asyncWrapper(bulkController.bulkUpdate));
router.delete('/delete', asyncWrapper(bulkController.bulkDelete));

module.exports = router;
