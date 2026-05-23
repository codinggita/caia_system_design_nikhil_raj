const authService = require('../services/auth.service');
const { sendResponse } = require('../utils/apiResponse');

const register = async (req, res) => {
  const data = await authService.registerUser(req.body);
  return sendResponse(res, 201, true, 'User registered successfully', data);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error('Please provide email and password');
  }
  const data = await authService.loginUser(email, password);
  return sendResponse(res, 200, true, 'Login successful', data);
};

const logout = async (req, res) => {
  // Since we use JWTs, logout is typically handled client-side by deleting the token.
  // We just return a success message.
  return sendResponse(res, 200, true, 'Logout successful', null);
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  const data = await authService.refreshAuthToken(refreshToken);
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
  await authService.deleteProfile(req.user._id);
  return sendResponse(res, 200, true, 'Profile deleted successfully', null);
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
