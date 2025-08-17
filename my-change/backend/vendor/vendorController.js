const express = require('express');
const router = express.Router();
const service = require('./vendorService');

router.post('/', (req, res) => {
  service.createVendor(req.body, (err, vendor) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).json(vendor);
  });
});

router.get('/', (req, res) => {
  service.getAllVendors((err, vendors) => {
    if (err) return res.status(500).send(err.message);
    res.json(vendors);
  });
});

module.exports = router;