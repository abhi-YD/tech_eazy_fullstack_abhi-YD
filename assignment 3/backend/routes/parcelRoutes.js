// routes/parcelRoutes.js
const express = require('express');
const router = express.Router();
const parcelController = require('../controllers/parcelController.js');
const { verifyToken, allowRoles } = require('../middleware/auth.js');

// Public tracking endpoint
router.get('/track/:id', parcelController.trackParcel);

// Admin endpoint to list all parcels
router.get('/', verifyToken, allowRoles('Admin'), parcelController.listParcels);

// Vendor endpoints (protected)
router.post('/', verifyToken, allowRoles('Vendor'), parcelController.createParcel);
router.put('/:id', verifyToken, allowRoles('Vendor','Admin'), parcelController.updateParcel); // admin or vendor
router.delete('/:id', verifyToken, allowRoles('Admin'), parcelController.deleteParcel); // admin only

module.exports = router;