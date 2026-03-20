'use strict';

const { auth, db } = require('../src/config/firebase');
const logger = require('../src/utils/logger');

const createAdmin = async (email, password) => {
  try {
    logger.info(`Creating/Syncing Firebase Admin user: ${email}...`);
    
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
      logger.info('User found in Firebase Auth. Updating roles...');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        userRecord = await auth.createUser({
          email,
          password,
          displayName: 'System Admin',
        });
        logger.info(`Successfully created new Firebase Auth user: ${userRecord.uid}`);
      } else {
        throw error;
      }
    }

    // Set custom claims for role-based access
    await auth.setCustomUserClaims(userRecord.uid, { role: 'Admin' });
    logger.info('Custom claims set: { role: "Admin" }');

    // FORCE Firestore User Document
    await db.collection('Users').doc(userRecord.uid).set({
      Name: userRecord.displayName || 'System Admin',
      Email: email,
      Role: 'Admin',
      CreatedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, { merge: true });

    logger.info(`Firestore User profile synced for UID: ${userRecord.uid}`);
    logger.info('--- ADMIN SYNCED SUCCESSFULLY ---');
    
    process.exit(0);
  } catch (error) {
    logger.error('Error creating admin:', error);
    process.exit(1);
  }
};

// Use CLI args if provided, else .env
const adminEmail = process.argv[2] || process.env.ADMIN_EMAIL || 'admin@ascento.com';
const adminPassword = process.argv[3] || process.env.ADMIN_PASSWORD || 'Admin@123';

createAdmin(adminEmail, adminPassword);
