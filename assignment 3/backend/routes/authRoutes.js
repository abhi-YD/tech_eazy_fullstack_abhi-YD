// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

router.post('/login', authController.login);
router.post('/register', authController.registerVendor); // admin can use to create vendor or vendor self-register

module.exports = router;