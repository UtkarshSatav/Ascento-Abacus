'use strict';

const { db } = require('../../config/firebase');
const AppError = require('../../core/AppError');

const create = async (data, adminId) => {
  const examStartDate = new Date(data.examStartDate);
  const examEndDate = new Date(data.examEndDate);
  
  const examData = {
    ...data,
    examStartDate,
    examEndDate,
    status: data.status || 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: adminId || 'system',
    updatedBy: adminId || 'system',
  };

  const docRef = await db.collection('exams').add(examData);
  return { id: docRef.id, ...examData };
};

const list = async ({ page = 1, limit = 20, classId, academicYearId, status } = {}) => {
  let query = db.collection('exams').orderBy('examStartDate', 'asc');

  if (classId) query = query.where('classId', '==', classId);
  if (academicYearId) query = query.where('academicYearId', '==', academicYearId);
  if (status) query = query.where('status', '==', status);

  const snapshot = await query.get();
  let exams = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const total = exams.length;
  const start = (page - 1) * limit;
  const data = exams.slice(start, start + limit);

  return { data, total, page, limit };
};

const getById = async (id) => {
  const doc = await db.collection('exams').doc(id).get();
  if (!doc.exists) {
    throw new AppError('Exam not found in Firebase.', 404);
  }
  return { id: doc.id, ...doc.data() };
};

const update = async (id, data, adminId) => {
  const docRef = db.collection('exams').doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw new AppError('Exam not found in Firebase.', 404);
  }

  const updateData = {
    ...data,
    updatedAt: new Date(),
    updatedBy: adminId || 'system',
  };

  if (data.examStartDate) updateData.examStartDate = new Date(data.examStartDate);
  if (data.examEndDate) updateData.examEndDate = new Date(data.examEndDate);

  await docRef.update(updateData);
  return { id, ...doc.data(), ...updateData };
};

const remove = async (id) => {
  const docRef = db.collection('exams').doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw new AppError('Exam not found in Firebase.', 404);
  }

  await docRef.delete();
};

const listByClass = async (classId, { academicYearId, status } = {}) => {
  let query = db.collection('exams').where('classId', '==', classId).orderBy('examStartDate', 'asc');

  if (academicYearId) query = query.where('academicYearId', '==', academicYearId);
  if (status) query = query.where('status', '==', status);

  const snapshot = await query.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const listForStudent = async (studentId, { classId, academicYearId, status } = {}) => {
  // Assuming student dashboard fetches classId from enrollment first
  let query = db.collection('exams').where('classId', '==', classId).orderBy('examStartDate', 'asc');

  if (academicYearId) query = query.where('academicYearId', '==', academicYearId);
  if (status) query = query.where('status', '==', status);

  const snapshot = await query.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

module.exports = { create, list, getById, update, remove, listByClass, listForStudent };
