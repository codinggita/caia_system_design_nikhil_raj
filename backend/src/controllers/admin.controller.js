const adminService = require('../services/admin.service');
const { sendResponse } = require('../utils/apiResponse');

const getUsers = async (req, res) => {
  const result = await adminService.getUsers(req.query);
  return sendResponse(res, 200, true, 'Users fetched successfully', result.data, result.pagination);
};

const getUserById = async (req, res) => {
  const data = await adminService.getUserById(req.params.id);
  return sendResponse(res, 200, true, 'User fetched successfully', data);
};

const updateUserRole = async (req, res) => {
  const data = await adminService.updateUserRole(req.params.id, req.body.role);
  return sendResponse(res, 200, true, 'User role updated successfully', data);
};

const banUser = async (req, res) => {
  const data = await adminService.banUser(req.params.id);
  return sendResponse(res, 200, true, 'User banned successfully', data);
};

const unbanUser = async (req, res) => {
  const data = await adminService.unbanUser(req.params.id);
  return sendResponse(res, 200, true, 'User unbanned successfully', data);
};

module.exports = {
  getUsers,
  getUserById,
  updateUserRole,
  banUser,
  unbanUser
};
