/**
 * Wraps async Express route handlers to automatically catch errors 
 * and pass them to the global error handling middleware.
 */
const asyncWrapper = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = asyncWrapper;
