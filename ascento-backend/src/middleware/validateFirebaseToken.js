'use strict';

const { auth } = require('../config/firebase');
const AppError = require('../core/AppError');
const asyncHandler = require('../core/asyncHandler');

/**
 * validateFirebaseToken — Middleware to authenticate users via Firebase ID Tokens.
 * 
 * Client must include header: Authorization: Bearer <ID_TOKEN>
 */
const validateFirebaseToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Unauthorized: No Firebase token provided.', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await auth.verifyIdToken(token);
    
    // Attach user info to request
    req.user = {
      id: decodedToken.uid,
      email: decodedToken.email,
      role: decodedToken.role || 'user', // Roles can be set via Custom Claims in Firebase
    };
    
    next();
  } catch (error) {
    console.error('Firebase token verification failed:', error);
    throw new AppError('Unauthorized: Invalid or expired Firebase token.', 401);
  }
});

module.exports = validateFirebaseToken;
