const db = require('./parcelModel');
const { v4: uuidv4 } = require('uuid');

function createParcel(parcel, vendor_id, callback) {
  const tracking_id = uuidv4();
  const stmt = db.prepare('INSERT INTO parcels VALUES (?, ?, ?, ?, ?, ?, ?)');
  stmt.run(tracking_id, vendor_id, parcel.customer_name, parcel.delivery_address, parcel.contact_number, parcel.size, parcel.weight, err => {
    if (err) return callback(err);
    callback(null, { tracking_id, ...parcel });
  });
}

function getParcelsByVendor(vendor_id, callback) {
  db.all('SELECT * FROM parcels WHERE vendor_id = ?', [vendor_id], callback);
}

module.exports = { createParcel, getParcelsByVendor };