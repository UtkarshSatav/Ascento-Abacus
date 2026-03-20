'use strict';

const mongoose = require('mongoose');
const logger = require('../utils/logger');
const env = require('./env');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 2000, 
    });
    logger.info(`MongoDB connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    logger.warn(`MongoDB Connection Failed: ${error.message}`);
    logger.warn('Running in Firebase-powered mode.');
    return false;
  }
};

module.exports = connectDB;
