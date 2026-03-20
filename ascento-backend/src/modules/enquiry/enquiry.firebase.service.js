'use strict';

const { db } = require('../../config/firebase');
const AppError = require('../../core/AppError');

// Create enquiry in Firestore
const create = async (data) => {
  const enquiryData = {
    fullName: data.fullName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    classInterested: data.classInterested,
    message: data.message,
    status: data.status || 'new',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const docRef = await db.collection('enquiries').add(enquiryData);
  return { id: docRef.id, ...enquiryData };
};

// List enquiries for admin (Firestore version)
const listForAdmin = async ({ page = 1, limit = 20, status, search } = {}) => {
  let query = db.collection('enquiries').orderBy('createdAt', 'desc');

  if (status) {
    query = query.where('status', '==', status);
  }

  // Note: Complex searching in Firestore isn't naturally supported like Mongoose.
  // For now, we'll implement simple filtering. For advanced fuzzy search, consider Algolia.
  const snapshot = await query.get();
  let enquiries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  if (search && String(search).trim()) {
    const keyword = String(search).trim().toLowerCase();
    enquiries = enquiries.filter(enq => 
      enq.fullName?.toLowerCase().includes(keyword) ||
      enq.email?.toLowerCase().includes(keyword) ||
      enq.phoneNumber?.includes(keyword)
    );
  }

  const total = enquiries.length;
  const start = (page - 1) * limit;
  const data = enquiries.slice(start, start + limit);

  return { data, total, page, limit };
};

// Update enquiry in Firestore
const update = async (id, payload, adminId) => {
  const docRef = db.collection('enquiries').doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw new AppError('Enquiry not found in Firebase.', 404);
  }

  const updateData = {
    ...payload,
    updatedAt: new Date(),
    updatedBy: adminId,
  };

  await docRef.update(updateData);
  return { id, ...doc.data(), ...updateData };
};

const getById = async (id) => {
  const docRef = db.collection('enquiries').doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw new AppError('Enquiry not found in Firebase.', 404);
  }

  return { id: doc.id, ...doc.data() };
};

const remove = async (id) => {
  const docRef = db.collection('enquiries').doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw new AppError('Enquiry not found in Firebase.', 404);
  }

  await docRef.delete();
};

module.exports = {
  create,
  listForAdmin,
  getById,
  update,
  remove,
};
