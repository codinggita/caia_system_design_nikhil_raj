const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const asyncWrapper = require('../utils/asyncWrapper');
const { protect } = require('../middlewares/auth.middleware');

router.post('/register', asyncWrapper(authController.register));
router.post('/login', asyncWrapper(authController.login));
router.post('/logout', asyncWrapper(authController.logout));
router.post('/refresh-token', asyncWrapper(authController.refreshToken));

router.get('/profile', protect, asyncWrapper(authController.getProfile));
router.patch('/profile', protect, asyncWrapper(authController.updateProfile));
router.delete('/profile', protect, asyncWrapper(authController.deleteProfile));

module.exports = router;
