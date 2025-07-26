const express = require('express');
const router = express.Router();
const vendorService = require('../vendor/vendorService');
const { generateToken } = require('./jwt');

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  vendorService.findVendorByEmail(email, (err, vendor) => {
    if (err || !vendor || vendor.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(vendor);
    res.json({ token, vendor });
  });
});

module.exports = router;