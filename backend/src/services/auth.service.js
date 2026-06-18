const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Generate Refresh token
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE,
  });
};

const register = async (userData) => {
  const { name, email, password } = userData;
  
  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password
  });

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    accessToken: generateToken(user._id),
    refreshToken: generateRefreshToken(user._id)
  };
};

const login = async (loginData) => {
  const { email, password } = loginData;
  
  // Check for user email
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  if (user.isBanned) {
    throw new Error('User account is banned');
  }

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    accessToken: generateToken(user._id),
    refreshToken: generateRefreshToken(user._id)
  };
};

const logout = async () => {
  // For logout, we don't need to do anything server-side
  // Client will just remove tokens from localStorage
  return true;
};

const refreshToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error('Refresh token is required');
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.isBanned) {
      throw new Error('Invalid refresh token or user banned');
    }

    return {
      accessToken: generateToken(user._id),
      refreshToken: generateRefreshToken(user._id)
    };
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};

const getProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const updateProfile = async (userId, updateData) => {
  // Prevent password update through this route
  if (updateData.password) {
    delete updateData.password;
  }
  
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true
  });
  
  return user;
};

const deleteProfile = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  return user;
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
