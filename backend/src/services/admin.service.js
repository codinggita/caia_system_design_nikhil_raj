const User = require('../models/user.model');
const paginate = require('../utils/paginate');

const getUsers = async (reqQuery) => {
  return await paginate(User, {}, reqQuery);
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error('User not found');
  return user;
};

const updateUserRole = async (id, role) => {
  const user = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true, runValidators: true }
  );
  if (!user) throw new Error('User not found');
  return user;
};

const banUser = async (id) => {
  const user = await User.findByIdAndUpdate(
    id,
    { isBanned: true },
    { new: true }
  );
  if (!user) throw new Error('User not found');
  return user;
};

const unbanUser = async (id) => {
  const user = await User.findByIdAndUpdate(
    id,
    { isBanned: false },
    { new: true }
  );
  if (!user) throw new Error('User not found');
  return user;
};

module.exports = {
  getUsers,
  getUserById,
  updateUserRole,
  banUser,
  unbanUser
};
