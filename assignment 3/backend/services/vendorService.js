// services/vendorService.js
const db = require('../models/db.js');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

function createVendor(vendor, callback) {
  const id = uuidv4();
  const hashed = bcrypt.hashSync(vendor.password, 8);
  const role = vendor.role === 'Admin' ? 'Admin' : 'Vendor';
  const stmt = db.prepare('INSERT INTO vendors (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)');
  stmt.run(id, vendor.name || null, vendor.email, hashed, role, function (err) {
    if (err) return callback(err);
    callback(null, { id, name: vendor.name, email: vendor.email, role });
  });
}

function getAllVendors(callback) {
  db.all('SELECT id, name, email, role, created_at FROM vendors', [], callback);
}

module.exports = { createVendor, getAllVendors };