const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const asyncWrapper = require('../utils/asyncWrapper');
const { protect } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');

router.use(protect, authorize('admin'));

router.get('/users', asyncWrapper(adminController.getUsers));
router.get('/users/:id', asyncWrapper(adminController.getUserById));
router.patch('/users/:id/role', asyncWrapper(adminController.updateUserRole));
router.patch('/users/:id/ban', asyncWrapper(adminController.banUser));
router.patch('/users/:id/unban', asyncWrapper(adminController.unbanUser));

module.exports = router;
