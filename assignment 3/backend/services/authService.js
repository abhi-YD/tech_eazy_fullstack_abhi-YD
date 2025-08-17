// services/authService.js
const db = require('../models/db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const SECRET = process.env.JWT_SECRET || 'very_secret_key';

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

function authenticateVendor(email, password, callback) {
  db.get('SELECT * FROM vendors WHERE email = ?', [email], (err, row) => {
    if (err) return callback(err);
    if (!row) return callback(new Error('Invalid credentials'));
    const ok = bcrypt.compareSync(password, row.password);
    if (!ok) return callback(new Error('Invalid credentials'));
    const token = jwt.sign({ id: row.id, role: row.role }, SECRET, { expiresIn: '4h' });
    callback(null, { token, vendor: { id: row.id, name: row.name, email: row.email, role: row.role } });
  });
}

module.exports = { createVendor, authenticateVendor };