'use strict';

const express = require('express');
const controller = require('./enquiry.controller');
const firebaseController = require('./enquiry.firebase.controller');

const router = express.Router();

// Current MongoDB Enquiry
router.post('/enquiry', controller.create);

// New Firebase Enquiry (For Transition)
router.post('/enquiry-firebase', firebaseController.createEnquiry);

module.exports = router;
