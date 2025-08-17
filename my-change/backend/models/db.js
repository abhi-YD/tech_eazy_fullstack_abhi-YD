// models/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_FILE = process.env.DB_FILE || path.join(__dirname, '..', 'tech_eazy.db');
const db = new sqlite3.Database(DB_FILE);

// initialize tables
db.serialize(() => {
  // vendors (with role)
  db.run(`
    CREATE TABLE IF NOT EXISTS vendors (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT CHECK (role IN ('Admin','Vendor')) DEFAULT 'Vendor',
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  // parcels (added pincode + created_at)
  db.run(`
    CREATE TABLE IF NOT EXISTS parcels (
      tracking_id TEXT PRIMARY KEY,
      vendor_id TEXT,
      customer_name TEXT,
      delivery_address TEXT,
      pincode TEXT,
      contact_number TEXT,
      size TEXT,
      weight TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (vendor_id) REFERENCES vendors(id)
    )
  `);

  // delivery_orders (file_link optional)
  db.run(`
    CREATE TABLE IF NOT EXISTS delivery_orders (
      id TEXT PRIMARY KEY,
      vendor_id TEXT,
      order_date TEXT,
      subscription_type TEXT,
      total_orders INTEGER,
      file_link TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (vendor_id) REFERENCES vendors(id)
    )
  `);
});

module.exports = db;