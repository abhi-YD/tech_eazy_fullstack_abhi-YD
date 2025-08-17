// routes/deliveryRoutes.js
const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController.js');
const { verifyToken, allowRoles } = require('../middleware/auth.js');
const multer = require('multer');
const path = require('path');

// multer config
const uploadDir = path.join(__dirname, '..', 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/upload', verifyToken, allowRoles('Vendor'), upload.single('file'), deliveryController.uploadFile);

router.get('/', verifyToken, allowRoles('Vendor','Admin'), deliveryController.listOrders);

// optionally: get today's orders (admin)
router.get('/today', verifyToken, allowRoles('Admin'), deliveryController.todayOrders);

module.exports = router;