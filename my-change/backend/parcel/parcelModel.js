const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("../db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS parcels (
    tracking_id TEXT PRIMARY KEY,
    customer_name TEXT,
    delivery_address TEXT,
    contact_number TEXT,
    size TEXT,
    weight TEXT,
    FOREIGN KEY(vendor_id) REFERENCES vendors(id)
  )`);
});

module.exports = db;