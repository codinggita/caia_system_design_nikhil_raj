const { sendResponse } = require('../utils/apiResponse');

/**
 * Middleware to restrict access to specific roles.
 * Must be used AFTER the auth `protect` middleware.
 * @param  {...string} roles - Allowed roles (e.g., 'admin')
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendResponse(res, 401, false, 'User not authenticated');
    }
    
    if (!roles.includes(req.user.role)) {
      return sendResponse(
        res,
        403,
        false,
        `User role ${req.user.role} is not authorized to access this route`
      );
    }
    next();
  };
};

module.exports = { authorize };
