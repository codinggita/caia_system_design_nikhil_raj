const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { sendResponse } = require('../utils/apiResponse');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return sendResponse(res, 401, false, 'Not authorized to access this route', null);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return sendResponse(res, 401, false, 'User associated with this token no longer exists', null);
    }

    if (req.user.isBanned) {
      return sendResponse(res, 403, false, 'Your account has been banned', null);
    }

    next();
  } catch (err) {
    return sendResponse(res, 401, false, 'Not authorized to access this route', null);
  }
};

module.exports = { protect };
