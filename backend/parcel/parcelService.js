const db = require("./parcelModel.js");
const { v4: uuidv4 } = require("uuid");

// Create a new parcel
function createParcel(parcel, callback) {
  const tracking_id = uuidv4();
  const stmt = db.prepare("INSERT INTO parcels VALUES (?, ?, ?, ?, ?, ?)");
  stmt.run(
    tracking_id,
    parcel.customer_name,
    parcel.delivery_address,
    parcel.contact_number,
    parcel.size,
    parcel.weight,
    (err) => {
      if (err) return callback(err);
      callback(null, { tracking_id, ...parcel });
    }
  );
}

// Get all parcels
function getAllParcels(callback) {
  db.all("SELECT * FROM parcels", [], (err, rows) => {
    callback(err, rows);
  });
}

// Get a parcel by ID
function getParcelById(tracking_id, callback) {
  db.get("SELECT * FROM parcels WHERE tracking_id = ?", [tracking_id], (err, row) => {
    callback(err, row);
  });
}

// Update a parcel
function updateParcel(tracking_id, parcel, callback) {
  const stmt = db.prepare(`
    UPDATE parcels SET 
      customer_name = ?, 
      delivery_address = ?, 
      contact_number = ?, 
      size = ?, 
      weight = ?
    WHERE tracking_id = ?
  `);

  stmt.run(
    parcel.customer_name,
    parcel.delivery_address,
    parcel.contact_number,
    parcel.size,
    parcel.weight,
    tracking_id,
    function (err)  {
      if (err) return callback(err);
      callback(null, { tracking_id, ...parcel });
    }
  );
}

// Delete a parcel
function deleteParcel(tracking_id, callback) {
  const stmt = db.prepare("DELETE FROM parcels WHERE tracking_id = ?");
  stmt.run(tracking_id, (err) => {
    if (err) return callback(err);
    callback(null, { message: "Deleted successfully" });
  });
}

module.exports = {
  createParcel,
  getAllParcels,
  getParcelById,
  updateParcel,
  deleteParcel
};