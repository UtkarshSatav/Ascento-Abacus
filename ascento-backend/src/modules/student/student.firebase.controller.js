'use strict';

const studentFirebaseService = require('./student.firebase.service');
const asyncHandler = require('../../core/asyncHandler');

const createStudent = asyncHandler(async (req, res) => {
  const student = await studentFirebaseService.create(req.body, req.admin?.id);
  res.status(201).json({
    status: 'success',
    data: student,
  });
});

const listStudents = asyncHandler(async (req, res) => {
  const result = await studentFirebaseService.list(req.query);
  res.status(200).json({
    status: 'success',
    ...result,
  });
});

const getStudent = asyncHandler(async (req, res) => {
  const student = await studentFirebaseService.getById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: student,
  });
});

const updateStudent = asyncHandler(async (req, res) => {
  const student = await studentFirebaseService.update(req.params.id, req.body, req.admin?.id);
  res.status(200).json({
    status: 'success',
    data: student,
  });
});

const deleteStudent = asyncHandler(async (req, res) => {
  await studentFirebaseService.remove(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

module.exports = {
  createStudent,
  listStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};
