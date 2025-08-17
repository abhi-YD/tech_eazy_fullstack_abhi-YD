// services/deliveryService.js
const db = require('../models/db.js');
const { v4: uuidv4 } = require('uuid');

function createOrder(data, callback) {
  const id = uuidv4();
  const { vendor_id, order_date, subscription_type, total_orders, file_link } = data;
  const stmt = db.prepare(`
    INSERT INTO delivery_orders (id, vendor_id, order_date, subscription_type, total_orders, file_link)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  stmt.run(id, vendor_id, order_date, subscription_type, total_orders || 0, file_link || null, function (err) {
    if (err) return callback(err);
    callback(null, { id, vendor_id, order_date, subscription_type, total_orders, file_link });
  });
}

function listByUser(user, callback) {
  if (user.role === 'Admin') {
    db.all('SELECT * FROM delivery_orders ORDER BY created_at DESC', [], callback);
  } else {
    db.all('SELECT * FROM delivery_orders WHERE vendor_id = ? ORDER BY created_at DESC', [user.id], callback);
  }
}

function today(callback) {
  const today = new Date().toISOString().split('T')[0];
  db.all('SELECT * FROM delivery_orders WHERE order_date = ?', [today], callback);
}

module.exports = { createOrder, listByUser, today };