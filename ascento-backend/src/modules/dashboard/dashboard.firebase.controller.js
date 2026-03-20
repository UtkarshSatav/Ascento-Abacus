'use strict';

const ApiResponse = require('../../core/ApiResponse');
const asyncHandler = require('../../core/asyncHandler');
const dashboardFirebaseService = require('./dashboard.firebase.service');

const getDashboardAnalytics = asyncHandler(async (req, res) => {
  const data = await dashboardFirebaseService.getDashboardAnalytics();
  return new ApiResponse(200, 'Admin Portal Dashboard data fetched from Firebase', data).send(res);
});

module.exports = {
  getDashboardAnalytics,
};
