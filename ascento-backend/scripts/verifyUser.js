'use strict';

const { auth, db } = require('../src/config/firebase');
const logger = require('../src/utils/logger');

const checkUser = async (email) => {
  try {
    const userRecord = await auth.getUserByEmail(email);
    console.log(`--- FIREBASE AUTH ---`);
    console.log(`UID: ${userRecord.uid}`);
    console.log(`Claims: ${JSON.stringify(userRecord.customClaims)}`);

    console.log(`\n--- FIRESTORE DATA ---`);
    const userDoc = await db.collection('Users').doc(userRecord.uid).get();
    if (userDoc.exists) {
      console.log(JSON.stringify(userDoc.data(), null, 2));
    } else {
      console.log("No Firestore document found in 'Users' collection.");
    }
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const email = process.argv[2] || 'ianutkarsh@gmail.com';
checkUser(email);
