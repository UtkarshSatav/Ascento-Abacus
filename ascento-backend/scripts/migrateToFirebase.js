'use strict';

const mongoose = require('mongoose');
const { db } = require('../src/config/firebase');
const connectDB = require('../src/config/db');
const logger = require('../src/utils/logger');

// Import all models
const Student = require('../src/models/student.model');
const Teacher = require('../src/models/teacher.model');
const ClassModel = require('../src/models/class.model');
const Enquiry = require('../src/models/enquiry.model');
const Attendance = require('../src/models/attendance.model');
const Fee = require('../src/models/fee.model');
const Subject = require('../src/models/subject.model');

const migrateCollection = async (Model, firestoreCollectionName) => {
  logger.info(`Migrating ${firestoreCollectionName}...`);
  const docs = await Model.find().lean();
  
  if (docs.length === 0) {
    logger.info(`No documents found for ${firestoreCollectionName}. Skipping.`);
    return;
  }

  const batch = db.batch();
  let count = 0;

  for (const doc of docs) {
    const docId = doc._id.toString();
    delete doc._id;
    delete doc.__v;

    // Convert ObjectIds to strings in all fields
    Object.keys(doc).forEach(key => {
      if (doc[key] instanceof mongoose.Types.ObjectId) {
        doc[key] = doc[key].toString();
      }
    });

    const docRef = db.collection(firestoreCollectionName).doc(docId);
    batch.set(docRef, {
      ...doc,
      migratedAt: new Date(),
    });
    
    count++;
    
    // Firestore batch limit is 500
    if (count % 500 === 0) {
      await batch.commit();
      logger.info(`Committed batch of 500 for ${firestoreCollectionName}`);
    }
  }

  await batch.commit();
  logger.info(`Successfully migrated ${count} documents to ${firestoreCollectionName}.`);
};

const runMigration = async () => {
  try {
    await connectDB();
    logger.info('Connected to MongoDB');

    // List of collections to migrate
    const collections = [
      { model: Student, name: 'students' },
      { model: Teacher, name: 'teachers' },
      { model: ClassModel, name: 'classes' },
      { model: Subject, name: 'subjects' },
      { model: Enquiry, name: 'enquiries' },
      { model: Attendance, name: 'attendance' },
      { model: Fee, name: 'fees' },
    ];

    for (const entry of collections) {
      await migrateCollection(entry.model, entry.name);
    }

    logger.info('Migration fully completed!');
    process.exit(0);
  } catch (error) {
    logger.error('Migration failed:', error);
    process.exit(1);
  }
};

runMigration();
