const bulkService = require('../services/bulk.service');
const { sendResponse } = require('../utils/apiResponse');

const bulkCreate = async (req, res) => {
  const data = await bulkService.bulkCreate(req.body.concepts);
  return sendResponse(res, 201, true, `${data.length} concepts created successfully`, data);
};

const bulkUpdate = async (req, res) => {
  const data = await bulkService.bulkUpdate(req.body.updates);
  return sendResponse(res, 200, true, 'Bulk update executed successfully', data);
};

const bulkDelete = async (req, res) => {
  const data = await bulkService.bulkDelete(req.body.ids);
  return sendResponse(res, 200, true, 'Bulk delete executed successfully', data);
};

module.exports = {
  bulkCreate,
  bulkUpdate,
  bulkDelete
};
