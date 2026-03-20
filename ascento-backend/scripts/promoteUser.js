'use strict';

const { db } = require('../src/config/firebase');
const logger = require('../src/utils/logger');

const promoteUser = async (email) => {
  try {
    logger.info(`Promoting user to Admin: ${email}...`);
    
    const snapshot = await db.collection('Users').where('Email', '==', email).get();
    
    if (snapshot.empty) {
      logger.error(`User with email ${email} not found in Firestore. Please sign up on the website first!`);
      process.exit(1);
    }

    const userDoc = snapshot.docs[0];
    await userDoc.ref.update({
      Role: 'Admin',
      updatedAt: new Date().toISOString()
    });

    logger.info(`Successfully promoted ${email} to Admin!`);
    logger.info('You can now log in to the Admin Portal.');
    process.exit(0);
  } catch (error) {
    logger.error('Error promoting user:', error);
    process.exit(1);
  }
};

// Use the email from the user's screenshot
const targetEmail = process.argv[2] || 'mono111@gmail.com';
promoteUser(targetEmail);
