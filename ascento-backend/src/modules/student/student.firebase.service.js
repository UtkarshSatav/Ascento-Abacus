'use strict';

const crypto = require('crypto');
const { db, auth: firebaseAuth } = require('../../config/firebase');
const AppError = require('../../core/AppError');

// Helper to sanitize student data for Firebase
const sanitiseStudent = (student) => {
  const obj = { ...student };
  delete obj.password;
  return obj;
};

// Generate roll number in Firebase
const generateRollNumber = async () => {
  const year = new Date().getFullYear();
  const snapshot = await db.collection('students')
    .where('createdAt', '>=', new Date(`${year}-01-01`))
    .where('createdAt', '<=', new Date(`${year}-12-31`))
    .count().get();
  
  const count = snapshot.data().count;
  const next = (count + 1).toString().padStart(4, '0');
  return `STU-${year}-${next}`;
};

const create = async (data, adminId) => {
  const rollNumber = await generateRollNumber();
  const tempPassword = `Stu@${crypto.randomBytes(4).toString('hex')}`;
  
  const studentData = {
    ...data,
    rollNumber,
    role: 'student',
    status: 'active',
    isPasswordTemporary: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: adminId || 'system',
    updatedBy: adminId || 'system',
  };

  // 1. Create in Firebase Auth (Optional but recommended for Full Switch)
  let firebaseUser;
  try {
    firebaseUser = await firebaseAuth.createUser({
      email: data.parentEmail,
      password: tempPassword,
      displayName: data.fullName,
    });
    // Set custom claims for role-based access
    await firebaseAuth.setCustomUserClaims(firebaseUser.uid, { role: 'student' });
    studentData.firebaseUid = firebaseUser.uid;
  } catch (err) {
    console.error('Firebase Auth creation failed:', err);
    // Continue even if Auth fails, or throw error depending on requirements
  }

  // 2. Create in Firestore
  const docRef = await db.collection('students').add(studentData);
  
  return {
    id: docRef.id,
    ...sanitiseStudent(studentData),
    temporaryPassword: tempPassword,
  };
};

const list = async ({ page = 1, limit = 20, status, search } = {}) => {
  let query = db.collection('students').orderBy('createdAt', 'desc');

  if (status) {
    query = query.where('status', '==', status);
  }

  const snapshot = await query.get();
  let students = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  if (search && String(search).trim()) {
    const keyword = String(search).trim().toLowerCase();
    students = students.filter(s => 
      s.fullName?.toLowerCase().includes(keyword) ||
      s.parentEmail?.toLowerCase().includes(keyword) ||
      s.rollNumber?.toLowerCase().includes(keyword)
    );
  }

  const total = students.length;
  const start = (page - 1) * limit;
  const data = students.slice(start, start + limit).map(sanitiseStudent);

  return { data, total, page, limit };
};

const getById = async (id) => {
  const doc = await db.collection('students').doc(id).get();
  if (!doc.exists) {
    throw new AppError('Student not found in Firebase.', 404);
  }
  return { id: doc.id, ...doc.data() };
};

const update = async (id, data, adminId) => {
  const docRef = db.collection('students').doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw new AppError('Student not found in Firebase.', 404);
  }

  const updateData = {
    ...data,
    updatedAt: new Date(),
    updatedBy: adminId || 'system',
  };

  // Basic validation to prevent overwriting critical fields
  delete updateData.rollNumber;
  delete updateData.role;
  delete updateData._id;

  await docRef.update(updateData);
  return { id, ...doc.data(), ...updateData };
};

const remove = async (id) => {
  const docRef = db.collection('students').doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw new AppError('Student not found in Firebase.', 404);
  }

  // Remove from Auth if exists
  if (doc.data().firebaseUid) {
    try {
      await firebaseAuth.deleteUser(doc.data().firebaseUid);
    } catch (err) {
      console.error('Failed to delete Firebase Auth user:', err);
    }
  }

  await docRef.delete();
};

module.exports = { create, list, getById, update, remove };
