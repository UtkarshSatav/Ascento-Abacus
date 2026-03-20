'use strict';

const express = require('express');
const controller = require('./enquiry.controller');
const firebaseController = require('./enquiry.firebase.controller');

const router = express.Router();

// Current MongoDB Enquiries
router.get('/', controller.listForAdmin);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

// New Firebase Enquiries
router.get('/firebase', firebaseController.listEnquiries);
router.put('/firebase/:id', firebaseController.updateEnquiry);
router.delete('/firebase/:id', firebaseController.deleteEnquiry);

module.exports = router;
