/**
 * Standardized API response formatter
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {Boolean} success - True if successful, false otherwise
 * @param {String} message - Human readable message
 * @param {Object|Array} data - Payload data
 * @param {Object} pagination - Optional pagination metadata
 */
const sendResponse = (res, statusCode, success, message, data = null, pagination = null) => {
  const responsePayload = {
    success,
    message,
    data,
  };

  if (pagination) {
    responsePayload.pagination = pagination;
  }

  return res.status(statusCode).json(responsePayload);
};

module.exports = {
  sendResponse,
};
