const authService = require('../services/auth.service');
const { sendResponse } = require('../utils/apiResponse');

const register = async (req, res) => {
  const data = await authService.register(req.body);
  return sendResponse(res, 201, true, 'User registered successfully', data);
};

const login = async (req, res) => {
  const data = await authService.login(req.body);
  return sendResponse(res, 200, true, 'User logged in successfully', data);
};

const logout = async (req, res) => {
  await authService.logout(req.body.refreshToken);
  return sendResponse(res, 200, true, 'User logged out successfully', null);
};

const refreshToken = async (req, res) => {
  const data = await authService.refreshToken(req.body.refreshToken);
  return sendResponse(res, 200, true, 'Token refreshed successfully', data);
};

const getProfile = async (req, res) => {
  const data = await authService.getProfile(req.user._id);
  return sendResponse(res, 200, true, 'Profile fetched successfully', data);
};

const updateProfile = async (req, res) => {
  const data = await authService.updateProfile(req.user._id, req.body);
  return sendResponse(res, 200, true, 'Profile updated successfully', data);
};

const deleteProfile = async (req, res) => {
  const data = await authService.deleteProfile(req.user._id);
  return sendResponse(res, 200, true, 'Profile deleted successfully', data);
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  getProfile,
  updateProfile,
  deleteProfile
};
