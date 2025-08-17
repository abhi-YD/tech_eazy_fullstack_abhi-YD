// controllers/vendorController.js
const vendorService = require('../services/vendorService.js');

function createVendor(req, res) {
  const { name, email, password, role } = req.body;
  vendorService.createVendor({ name, email, password, role }, (err, vendor) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(vendor);
  });
}

function getAllVendors(req, res) {
  vendorService.getAllVendors((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
}

module.exports = { createVendor, getAllVendors };