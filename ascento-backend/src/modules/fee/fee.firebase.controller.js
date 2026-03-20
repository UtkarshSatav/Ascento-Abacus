'use strict';

const feeFirebaseService = require('./fee.firebase.service');
const asyncHandler = require('../../core/asyncHandler');

const createFee = asyncHandler(async (req, res) => {
  const fee = await feeFirebaseService.create(req.body, req.admin?.id);
  res.status(201).json({
    status: 'success',
    data: fee,
  });
});

const listFees = asyncHandler(async (req, res) => {
  const result = await feeFirebaseService.listForAdmin(req.query);
  res.status(200).json({
    status: 'success',
    ...result,
  });
});

const markAsPaid = asyncHandler(async (req, res) => {
  const fee = await feeFirebaseService.markAsPaid(req.body, req.admin?.id);
  res.status(200).json({
    status: 'success',
    data: fee,
  });
});

const listForStudent = asyncHandler(async (req, res) => {
  const fees = await feeFirebaseService.listForStudent(req.params.studentId, req.query);
  res.status(200).json({
    status: 'success',
    data: fees,
  });
});

module.exports = {
  createFee,
  listFees,
  markAsPaid,
  listForStudent,
};
