// services/parcelService.js
const db = require('../models/db.js');
const { v4: uuidv4 } = require('uuid');

function create(data, vendor_id, callback) {
  const tracking_id = uuidv4();
  const { customer_name, delivery_address, pincode, contact_number, size, weight } = data;
  const stmt = db.prepare(`
    INSERT INTO parcels (tracking_id, vendor_id, customer_name, delivery_address, pincode, contact_number, size, weight)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(tracking_id, vendor_id, customer_name, delivery_address, pincode || null, contact_number, size, weight, function (err) {
    if (err) return callback(err);
    callback(null, { tracking_id, vendor_id, customer_name, delivery_address, pincode, contact_number, size, weight });
  });
}

function getAll(callback) {
  db.all('SELECT * FROM parcels ORDER BY created_at DESC', [], callback);
}

function getByTrackingId(tracking_id, callback) {
  db.get('SELECT * FROM parcels WHERE tracking_id = ?', [tracking_id], callback);
}

function update(tracking_id, data, callback) {
  const { customer_name, delivery_address, pincode, contact_number, size, weight } = data;
  db.run(
    `UPDATE parcels SET customer_name=?, delivery_address=?, pincode=?, contact_number=?, size=?, weight=? WHERE tracking_id = ?`,
    [customer_name, delivery_address, pincode || null, contact_number, size, weight, tracking_id],
    function (err) {
      if (err) return callback(err);
      callback(null, { tracking_id, ...data });
    }
  );
}

function remove(tracking_id, callback) {
  db.run('DELETE FROM parcels WHERE tracking_id = ?', [tracking_id], function (err) {
    if (err) return callback(err);
    callback(null);
  });
}

module.exports = { create, getAll, getByTrackingId, update, remove };