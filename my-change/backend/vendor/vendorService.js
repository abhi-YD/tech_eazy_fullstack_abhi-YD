const db = require('./vendorModel');
const { v4: uuidv4 } = require('uuid');

function createVendor(vendor, callback) {
  const id = uuidv4();
  const stmt = db.prepare('INSERT INTO vendors VALUES (?, ?, ?, ?)');
  stmt.run(id, vendor.name, vendor.email, vendor.password, err => {
    if (err) return callback(err);
    callback(null, { id, ...vendor });
  });
}

function getAllVendors(callback) {
  db.all('SELECT * FROM vendors', [], callback);
}

function findVendorByEmail(email, callback) {
  db.get('SELECT * FROM vendors WHERE email = ?', [email], callback);
}

module.exports = { createVendor, getAllVendors, findVendorByEmail };