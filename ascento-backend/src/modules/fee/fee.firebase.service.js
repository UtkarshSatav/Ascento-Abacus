'use strict';

const { db } = require('../../config/firebase');
const AppError = require('../../core/AppError');

const create = async (data, adminId) => {
  const feeData = {
    studentId: data.studentId,
    classId: data.classId,
    academicYearId: data.academicYearId,
    feeType: data.feeType,
    amount: Number(data.amount),
    dueDate: data.dueDate ? new Date(data.dueDate) : null,
    paymentStatus: data.paymentStatus || 'pending',
    paymentDate: data.paymentDate ? new Date(data.paymentDate) : null,
    paymentMethod: data.paymentMethod || null,
    transactionReference: data.transactionReference || null,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: adminId || 'system',
    updatedBy: adminId || 'system',
  };

  const docRef = await db.collection('fees').add(feeData);
  return { id: docRef.id, ...feeData };
};

const listForAdmin = async ({
  page = 1,
  limit = 20,
  studentId,
  classId,
  academicYearId,
  feeType,
  paymentStatus,
} = {}) => {
  let query = db.collection('fees').orderBy('createdAt', 'desc');

  if (studentId) query = query.where('studentId', '==', studentId);
  if (classId) query = query.where('classId', '==', classId);
  if (academicYearId) query = query.where('academicYearId', '==', academicYearId);
  if (feeType) query = query.where('feeType', '==', feeType);
  if (paymentStatus) query = query.where('paymentStatus', '==', paymentStatus);

  const snapshot = await query.get();
  let fees = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const total = fees.length;
  const start = (page - 1) * limit;
  const data = fees.slice(start, start + limit);

  return { data, total, page, limit };
};

const markAsPaid = async ({ feeId, paymentDate, paymentMethod, transactionReference }, adminId) => {
  const docRef = db.collection('fees').doc(feeId);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw new AppError('Fee record not found in Firebase.', 404);
  }

  const fee = doc.data();
  if (fee.paymentStatus === 'paid') {
    throw new AppError('Fee is already marked as paid.', 409);
  }

  const updateData = {
    paymentStatus: 'paid',
    paymentDate: paymentDate ? new Date(paymentDate) : new Date(),
    paymentMethod: paymentMethod || 'cash',
    transactionReference: transactionReference || null,
    updatedAt: new Date(),
    updatedBy: adminId || 'system',
  };

  await docRef.update(updateData);
  return { id: feeId, ...fee, ...updateData };
};

const listForStudent = async (studentId, { paymentStatus, academicYearId } = {}) => {
  let query = db.collection('fees').where('studentId', '==', studentId).orderBy('createdAt', 'desc');

  if (paymentStatus) query = query.where('paymentStatus', '==', paymentStatus);
  if (academicYearId) query = query.where('academicYearId', '==', academicYearId);

  const snapshot = await query.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

module.exports = { create, listForAdmin, markAsPaid, listForStudent };
