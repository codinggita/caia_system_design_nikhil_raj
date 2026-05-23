const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { sendResponse } = require('../utils/apiResponse');

const protect = async (req, res, next) => {
  let token;

  // Check headers for authorization token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return sendResponse(res, 401, false, 'Not authorized to access this route');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to req object
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return sendResponse(res, 401, false, 'User no longer exists');
    }

    if (req.user.isBanned) {
      return sendResponse(res, 403, false, 'User account is banned');
    }

    next();
  } catch (err) {
    return sendResponse(res, 401, false, 'Not authorized to access this route. Token failed.');
  }
};

module.exports = { protect };
