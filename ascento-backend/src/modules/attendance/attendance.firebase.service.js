'use strict';

const { db } = require('../../config/firebase');
const AppError = require('../../core/AppError');

const createBulk = async (attendanceRecords, adminId) => {
  const batch = db.batch();
  const results = [];

  for (const record of attendanceRecords) {
    const docRef = db.collection('attendance').doc();
    const attendanceData = {
      ...record,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: adminId || 'system',
      updatedBy: adminId || 'system',
    };
    
    batch.set(docRef, attendanceData);
    results.push({ id: docRef.id, ...attendanceData });
  }

  await batch.commit();
  return results;
};

const listForStudent = async (studentId, { month, year } = {}) => {
  let query = db.collection('attendance').where('studentId', '==', studentId);

  if (month && year) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);
    query = query.where('date', '>=', start).where('date', '<', end);
  }

  const snapshot = await query.orderBy('date', 'desc').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const listForAdmin = async ({ date, classId, sectionId } = {}) => {
  let query = db.collection('attendance');

  if (date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    query = query.where('date', '>=', start).where('date', '<', end);
  }

  if (classId) {
    query = query.where('classId', '==', classId);
  }

  if (sectionId) {
    query = query.where('sectionId', '==', sectionId);
  }

  const snapshot = await query.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const update = async (id, status, adminId) => {
  const docRef = db.collection('attendance').doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw new AppError('Attendance record not found in Firebase.', 404);
  }

  const updateData = {
    status,
    updatedAt: new Date(),
    updatedBy: adminId || 'system',
  };

  await docRef.update(updateData);
  return { id, ...doc.data(), ...updateData };
};

module.exports = { createBulk, listForStudent, listForAdmin, update };
