// routes/vendorRoutes.js
const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController.js');
const { verifyToken, allowRoles } = require('../middleware/auth.js');

router.post('/', vendorController.createVendor); // optional: open or admin-only
router.get('/', verifyToken, allowRoles('Admin'), vendorController.getAllVendors); // admin can list vendors

module.exports = router;