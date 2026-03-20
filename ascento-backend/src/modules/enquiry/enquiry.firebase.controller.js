'use strict';

const ApiResponse = require('../../core/ApiResponse');
const asyncHandler = require('../../core/asyncHandler');
const enquiryFirebaseService = require('./enquiry.firebase.service');

const createEnquiry = asyncHandler(async (req, res) => {
  const data = await enquiryFirebaseService.create(req.body);
  return new ApiResponse(201, 'Enquiry created in Firebase', data).send(res);
});

const listEnquiries = asyncHandler(async (req, res) => {
  const { page, limit, status, search } = req.query;
  const result = await enquiryFirebaseService.listForAdmin({ 
    page: Number(page) || 1, 
    limit: Number(limit) || 20, 
    status, 
    search 
  });
  return new ApiResponse(200, 'Firebase Enquiries fetched', result).send(res);
});

const getEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await enquiryFirebaseService.getById(id);
  return new ApiResponse(200, 'Firebase Enquiry fetched', data).send(res);
});

const updateEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await enquiryFirebaseService.update(id, req.body, req.admin?.id);
  return new ApiResponse(200, 'Firebase Enquiry updated', data).send(res);
});

const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await enquiryFirebaseService.remove(id);
  return new ApiResponse(200, 'Firebase Enquiry deleted', {}).send(res);
});

module.exports = {
  createEnquiry,
  listEnquiries,
  getEnquiry,
  updateEnquiry,
  deleteEnquiry,
};
