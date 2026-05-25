const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { sendResponse } = require('../utils/apiResponse');

router.get('/health', (req, res) => {
  return sendResponse(res, 200, true, 'API is running', null);
});

router.get('/system/status', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  const data = {
    database: dbStatus,
    memoryUsage: process.memoryUsage(),
    cpuUsage: process.cpuUsage()
  };
  return sendResponse(res, 200, true, 'System status fetched', data);
});

router.get('/system/version', (req, res) => {
  const data = {
    version: '1.0.0', // This could be fetched from package.json
    nodeVersion: process.version
  };
  return sendResponse(res, 200, true, 'System version fetched', data);
});

router.get('/system/uptime', (req, res) => {
  const data = {
    uptimeSeconds: process.uptime()
  };
  return sendResponse(res, 200, true, 'System uptime fetched', data);
});

module.exports = router;
