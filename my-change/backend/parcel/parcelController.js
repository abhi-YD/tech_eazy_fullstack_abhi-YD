const express = require('express');
const router = express.Router();
const service = require('./parcelService');
const { authenticateToken } = require('../auth/middleware');

router.post('/', authenticateToken, (req, res) => {
  service.createParcel(req.body, req.vendor.id, (err, parcel) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).json(parcel);
  });
});

router.get('/', authenticateToken, (req, res) => {
  service.getParcelsByVendor(req.vendor.id, (err, parcels) => {
    if (err) return res.status(500).send(err.message);
    res.json(parcels);
  });
});

module.exports = router;